import ReactModal from "react-modal";
import cn from "classnames";
import s from "./styles.module.scss";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  modalClassName?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  show,
  modalClassName,
  children,
  handleClose,
}) => {
  return (
    <ReactModal
      overlayClassName={s.overlay}
      shouldCloseOnOverlayClick
      className={cn(s.modal, modalClassName)}
      isOpen={show}
      onRequestClose={handleClose}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;

ReactModal.setAppElement("#root");
