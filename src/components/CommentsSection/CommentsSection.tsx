import React from "react";
import styles from "./CommentsSection.module.css";

interface CommentsSectionProps {
  children: React.ReactNode;
}

const CommentsSection = ({ children }: CommentsSectionProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default CommentsSection;
