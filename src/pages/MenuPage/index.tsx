import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, socket, ClientEvents, ServerEvents, Game } from "data";
import { ChipList, ChipItem } from "components/ChipList";
import ColorSquare from "components/ColorSquare";
import CreateGameModal from "components/Modals/CreateGame";

import s from "./styles.module.scss";

const MenuPage = () => {
  const { nickname, games, color, setGames, addGame } = useStore();
  const navigate = useNavigate();

  const [isShown, setIsShown] = useState(false);

  const redirectToLobby = (name: string) => {
    navigate(`/lobby/${name}`);
  };

  const insertNewGame = useCallback(
    (gameId: string) => {
      addGame({ id: gameId });
    },
    [addGame]
  );

  const createGame = (lobbyName: string) => {
    console.log(lobbyName);

    socket.emit(
      ClientEvents.CREATE_NEW_GAME,
      { name: nickname, color },
      (gameId: string) => {
        navigate(`/lobby/${gameId}`);
      }
    );
  };

  useEffect(() => {
    socket.emit(ClientEvents.GET_LOBBY_LIST, (games: Game[] = []) => {
      setGames(games);
    });

    socket.on(ServerEvents.GAME_CREATED, insertNewGame);

    return () => {
      socket.off(ServerEvents.GAME_CREATED, insertNewGame);
    };
  }, [setGames, insertNewGame]);

  return (
    <main className={s.wrap}>
      <main className={s.menu}>
        <div className={s.menuHead}>
          <h1 className={s.menuTitle}>Welcome {nickname}!</h1>
          {color && (
            <div className={s.menuSubTitle}>
              <span className={s.menuSubTitleText}>Your color is</span>
              <ColorSquare color={color} />
            </div>
          )}
        </div>
        <ChipList className={s.menuList}>
          {games?.map(({ id }) => (
            <ChipItem
              key={id}
              onClick={() => redirectToLobby(id)}
              className={s.menuListItem}
            >
              <span>{id}</span>
              {/* <span>Players: {usersAmount}</span> */}
            </ChipItem>
          ))}
        </ChipList>
        <div className={s.menuActions}>
          <button
            className={s.menuActionsButton}
            onClick={() => setIsShown(true)}
          >
            Create game
          </button>
          <button className={s.menuActionsButton}>Settings</button>
        </div>
      </main>
      <CreateGameModal
        show={isShown}
        handleClose={() => setIsShown(false)}
        createGame={createGame}
      />
    </main>
  );
};

export default MenuPage;
