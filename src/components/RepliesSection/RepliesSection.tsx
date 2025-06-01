import { PropsWithChildren } from "react";
import styles from "./RepliesSection.module.css";

const RepliesSection = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <div className={styles.separator}></div>
      <div className={styles.replies}> {children}</div>
    </div>
  );
};

export default RepliesSection;
