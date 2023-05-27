import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore, socket, ServerEvents, ClientEvents } from "data";
import { ChipList, ChipItem } from "components/ChipList";
import ColorSquare from "components/ColorSquare";

import s from "./styles.module.scss";

interface GameParticipant {
  id: string;
  name: string;
  color: string;
}

interface JoinGameResponse {
  gameId: string;
  players: GameParticipant[];
}

const LobbyPage = () => {
  const { id } = useParams();
  const [players, updatePlayers] = useState<GameParticipant[]>([]);

  const { nickname, color } = useStore();

  const addPlayersToList = useCallback((player: GameParticipant) => {
    updatePlayers((prevState) => [...prevState, player]);
  }, []);

  useEffect(() => {
    socket.on(ServerEvents.PLAYER_JOINED, addPlayersToList);

    socket.emit(
      ClientEvents.JOIN_GAME,
      {
        user: { name: nickname, color },
        gameId: id,
      },
      (gameParticipants: JoinGameResponse) => {
        console.log(gameParticipants);
        updatePlayers(gameParticipants.players);
      }
    );

    return () => {
      socket.off(ServerEvents.PLAYER_JOINED, addPlayersToList);
    };
  }, [addPlayersToList, nickname, color, id]);

  return (
    <main className={s.wrap}>
      <div className={s.lobby}>
        <div className={s.lobbyHead}>
          <h1 className={s.lobbyTitle}>Prepare for game!</h1>
        </div>

        <ChipList className={s.lobbyList}>
          {players.map(({ name, color }) => (
            <ChipItem>
              <div className={s.lobbyListItemText}>{name}</div>
              <ColorSquare color={color} />
            </ChipItem>
          ))}
        </ChipList>

        <button className={s.lobbyButton} type="button">
          Ready !
        </button>
      </div>
    </main>
  );
};

export default LobbyPage;
