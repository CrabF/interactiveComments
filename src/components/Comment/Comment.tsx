import { IconMinus, IconPlus, IconReply } from "@/assets";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  createdAt: string;
  score: number;
  userInfo: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

const Comment = ({ content, createdAt, userInfo, score }: CommentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.score}>
        <button className={styles.btnCounter}>
          <IconPlus />
        </button>
        <p className={`${styles.counter} ${styles.textSelection}`}>{score}</p>
        <button className={styles.btnCounter}>
          <IconMinus />
        </button>
      </div>
      <div className={styles.content}>
        <span className={styles.head}>
          <span className={styles.userInfo}>
            <img
              className={styles.avatar}
              src={userInfo.image.webp || userInfo.image.png}
              alt="avatar"
            />
            <p className={styles.name}>{userInfo.username}</p>
            <p className={styles.text}>{createdAt}</p>
          </span>
          <button className={styles.btnReply}>
            <IconReply />
            <p className={styles.textSelection}>Reply</p>
          </button>
        </span>
        <p className={styles.text}>{content}</p>
      </div>
    </div>
  );
};

export default Comment;
