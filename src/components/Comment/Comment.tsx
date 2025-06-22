import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from "@/assets";
import { Comment as CommentInterface, Data } from "@/types/types";
import UserContext from "@/UserContext";
import React, { SetStateAction, useContext, useState } from "react";
import RepliesSection from "../RepliesSection";
import Reply from "../Reply";
import styles from "./Comment.module.css";

interface CommentProps {
  replyingTo?: string;
  level: number;
  commentData: CommentInterface;
  data: Data;
  setData: React.Dispatch<SetStateAction<Data | undefined>>;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}

const Comment = ({
  commentData,
  replyingTo,
  level,
  data,
  setData,
  setModal,
}: CommentProps) => {
  level++;
  const { content, createdAt, replies, score, user, id } = commentData;
  const [isReplying, setIsReplying] = useState(false);
  const currentUser = useContext(UserContext);

  const handleReplyComment = () => {
    setIsReplying(!isReplying);
  };

  const handleDeleteComment = () => {
    setModal(true);
    // const newComments = data.comments.filter((comment) => comment.id != id);

    // setData({
    //   comments: newComments,
    //   currentUser: currentUser!,
    // });
  };

  const handleEditComment = () => {};

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
              {user.username === currentUser?.username && (
                <p className={styles.currentUser}>you</p>
              )}
              <p className={styles.text}>{createdAt}</p>
            </span>
            {user.username === currentUser?.username ? (
              <div className={styles.userBtns}>
                <button onClick={handleDeleteComment} className={styles.btn}>
                  <IconDelete />
                  <p className={`${styles.textSelection} ${styles.textSpec}`}>
                    Delete
                  </p>
                </button>
                <button onClick={handleEditComment} className={styles.btn}>
                  <IconEdit />
                  <p className={styles.textSelection}>Edit</p>
                </button>
              </div>
            ) : (
              <button onClick={handleReplyComment} className={styles.btn}>
                <IconReply />
                <p className={styles.textSelection}>Reply</p>
              </button>
            )}
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
          parrentComment={commentData}
          setIsReplying={setIsReplying}
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
                setModal={setModal}
                key={reply.id}
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
