import { IconMinus, IconPlus, IconReply } from "@/assets";
import { Comment as CommentInterface, Data } from "@/types/types";
import UserContext from "@/UserContext";
import { SetStateAction, useContext, useState } from "react";
import RepliesSection from "../RepliesSection";
import Reply from "../Reply";
import styles from "./Comment.module.css";

interface CommentProps {
  replyingTo?: string;
  level: number;
  commentData: CommentInterface;
  data: Data;
  setData: React.Dispatch<SetStateAction<Data | undefined>>;
}

const Comment = ({
  commentData,
  replyingTo,
  level,
  data,
  setData,
}: CommentProps) => {
  level++;
  const { content, createdAt, replies, score, user } = commentData;
  const [isReplying, setIsReplying] = useState(false);
  const currentUser = useContext(UserContext);

  const handleReplyComment = () => {
    setIsReplying(!isReplying);
  };

  if (level > 5) {
    return null;
  }

  return (
    <>
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
                src={user.image.webp || user.image.png}
                alt="avatar"
              />
              <p className={styles.name}>{user.username}</p>
              <p className={styles.text}>{createdAt}</p>
            </span>
            <button onClick={handleReplyComment} className={styles.btnReply}>
              <IconReply />
              <p className={styles.textSelection}>Reply</p>
            </button>
          </span>
          <span className={styles.text}>
            {replyingTo && (
              <b className={styles.textSelection}>{`@${replyingTo} `}</b>
            )}
            {content}
          </span>
        </div>
      </div>
      {isReplying && (
        <Reply
          data={data}
          setData={setData}
          replyingTo={user.username}
          avatar={currentUser?.image ?? { png: "", webp: "" }}
        />
      )}
      {replies && (
        <RepliesSection>
          {commentData.replies.map((reply) => {
            return (
              <Comment
                data={data}
                setData={setData}
                replyingTo={reply.replyingTo}
                commentData={reply}
                level={level + 1}
              ></Comment>
            );
          })}
        </RepliesSection>
      )}
    </>
  );
};

export default Comment;
