import Comment from "@/components/Comment";
import CommentsSection from "@/components/CommentsSection";
import Layout from "@/components/Layout";
import Reply from "@/components/Reply";
import { Data } from "@/types/types";
import UserContext from "@/UserContext";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    fetch("../../data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <UserContext.Provider value={data?.currentUser ?? null}>
      <Layout>
        <CommentsSection>
          {data?.comments.map((comment) => {
            return (
              <Comment
                data={data}
                setData={setData}
                commentData={comment}
                level={0}
              />
            );
          })}
          {data?.currentUser && (
            <Reply
              setData={setData}
              data={data}
              avatar={data?.currentUser.image}
            ></Reply>
          )}
        </CommentsSection>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;
