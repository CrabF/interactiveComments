import { Data } from "@/types/types";
import UserContext from "@/UserContext";
import { SetStateAction, useContext, useState } from "react";
import styles from "./Reply.module.css";

interface ReplyProps {
  avatar: {
    png: string;
    webp: string;
  };
  replyingTo?: string;
  data: Data;
  setData: React.Dispatch<SetStateAction<Data | undefined>>;
}

const Reply = ({ avatar, replyingTo, data, setData }: ReplyProps) => {
  const [commentTxt, setCommentTxt] = useState("");
  const currentUser = useContext(UserContext);

  // This is mock data as example
  const generateReply = () => {
    return {
      id: 100,
      content: commentTxt,
      createdAt: "1 week ago",
      score: 0,
      replyingTo: replyingTo,
      user: currentUser!,
      replies: [],
    };
  };

  // Till this func add only main comment
  const handleSetReply = () => {
    const newData = {
      currentUser: currentUser!,
      comments: [...data.comments, generateReply()],
    };
    setData(newData);
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
      >
        {replyingTo && `@${replyingTo}, `}
      </textarea>
      <button onClick={handleSetReply} className={styles.btn}>
        <p className={styles.btnText}>{replyingTo ? "Reply" : "Send"}</p>
      </button>
    </div>
  );
};

export default Reply;
