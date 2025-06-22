import Comment from "@/components/Comment";
import CommentsSection from "@/components/CommentsSection";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Reply from "@/components/Reply";
import { Data } from "@/types/types";
import UserContext from "@/UserContext";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState<Data>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(styles.hidden);
  }, [isOpenModal]);

  useEffect(() => {
    type DataType = Awaited<ReturnType<typeof fetchData>>;
    async function fetchData(): Promise<Data> {
      const response = await fetch("../../data.json");
      const data: DataType = await response.json();
      setData(data);
      return data;
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={data?.currentUser ?? null}>
      <Layout>
        <CommentsSection>
          {data?.comments.map((comment) => {
            return (
              <Comment
                setModal={setIsOpenModal}
                key={comment.id}
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
        {isOpenModal &&
          createPortal(
            <Modal deleteComment={() => {}} setIsModalOpen={setIsOpenModal} />,
            document.body
          )}
      </Layout>
    </UserContext.Provider>
  );
};

export default App;
