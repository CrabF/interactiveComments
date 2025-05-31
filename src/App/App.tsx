import Comment from "@/components/Comment";
import CommentsSection from "@/components/CommentsSection";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
interface Data {
  comments: Comment[];
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

type Reply = Comment & { replyingTo: string };

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Reply[] | [];
}

const App = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    fetch("../../data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);

  return (
    <Layout>
      <CommentsSection>
        {data &&
          data.comments.map((comment) => {
            return (
              <Comment
                content={comment.content}
                key={comment.id}
                createdAt={comment.createdAt}
                score={comment.score}
                userInfo={comment.user}
              />
            );
          })}
      </CommentsSection>
    </Layout>
  );
};

export default App;
