import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
