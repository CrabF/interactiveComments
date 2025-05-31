import { PropsWithChildren } from "react";
import styles from "./CommentsSection.module.css";

const CommentsSection = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

export default CommentsSection;
