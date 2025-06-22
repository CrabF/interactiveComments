import React, { SetStateAction } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  deleteComment: () => void;
}

const Modal = ({ setIsModalOpen, deleteComment }: ModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Delete comment</h2>
        <p className={styles.txt}>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be updone.
        </p>
        <div className={styles.btns}>
          <button onClick={() => setIsModalOpen(false)} className={styles.btn}>
            No, cancel
          </button>
          <button
            onClick={deleteComment}
            className={`${styles.btn} ${styles.btnDelete}`}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
