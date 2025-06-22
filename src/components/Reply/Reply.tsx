import { Comment, Data } from "@/types/types";
import UserContext from "@/UserContext";
import { SetStateAction, useContext, useState } from "react";
import styles from "./Reply.module.css";

interface ReplyProps {
  parrentComment?: Comment;
  avatar: {
    png: string;
    webp: string;
  };
  replyingTo?: string;
  data: Data;
  setData: React.Dispatch<SetStateAction<Data | undefined>>;
  setIsReplying?: React.Dispatch<SetStateAction<boolean>>;
}

const Reply = ({
  parrentComment,
  avatar,
  replyingTo,
  data,
  setData,
  setIsReplying,
}: ReplyProps) => {
  const [commentTxt, setCommentTxt] = useState(
    replyingTo ? `@${replyingTo}, ` : ""
  );
  const currentUser = useContext(UserContext);
  let id = 100;

  const reformCommentTxt = commentTxt.split(",").slice(1).join("");

  // This is mock data as example
  const generateReply = (newComment = false) => {
    return {
      id: id++,
      content: newComment ? commentTxt : reformCommentTxt,
      createdAt: "now",
      score: 0,
      replyingTo: replyingTo!,
      user: currentUser!,
      replies: [],
    };
  };

  // Till this func add only main comment
  const handleSetReply = () => {
    data.comments.find((comment) => comment);
    if (replyingTo) {
      parrentComment?.replies.push(generateReply());
      setIsReplying!(false);
    } else {
      const newData = {
        currentUser: currentUser!,
        comments: [...data.comments, generateReply(true)],
      };
      setData(newData);
      setCommentTxt("");
    }
  };
  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={avatar.webp || avatar.png}
        alt="avatar"
      />
      <textarea
        onChange={(e) => {
          setCommentTxt(e.target.value);
        }}
        className={styles.textArea}
        placeholder="Add a comment..."
        name="postComment"
        id=""
        value={commentTxt}
      ></textarea>
      <button onClick={handleSetReply} className={styles.btn}>
        <p className={styles.btnText}>{replyingTo ? "Reply" : "Send"}</p>
      </button>
    </div>
  );
};

export default Reply;
