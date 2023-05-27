import { useForm } from "react-hook-form";
import cn from "classnames";
import Modal from "..";
import s from "./styles.module.scss";

interface CreateGameModalProps {
  show: boolean;
  createGame: (name: string) => void;
  handleClose: () => void;
}

interface CreateGameValues {
  lobbyName: string;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({
  show,
  createGame,
  handleClose,
}) => {
  const { register, handleSubmit, reset } = useForm<CreateGameValues>();

  const closeWithReset = () => {
    reset();
    handleClose();
  };

  const onSubmit = ({ lobbyName }: CreateGameValues) => {
    createGame(lobbyName);
    reset();
  };

  return (
    <Modal show={show} handleClose={closeWithReset} modalClassName={s.modal}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
      >
        <div className={s.formGroup}>
          <h2 className={s.formTitle}>Enter lobby name: </h2>
        </div>
        <div className={s.formGroup}>
          <input
            className={s.formInput}
            type="text"
            {...register("lobbyName")}
          />
        </div>
        <div className={cn(s.formGroup, s.formButtons)}>
          <button
            className={s.formButtonsItem}
            onClick={closeWithReset}
            type="button"
          >
            Cancel
          </button>
          <button className={s.formButtonsItem} type="submit">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGameModal;
