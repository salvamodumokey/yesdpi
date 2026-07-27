import type { ReactNode } from "react";
import styles from "./ContentPage.module.css";

interface ContentPageProps {
  h1: string;
  breadcrumb?: ReactNode;
  children: ReactNode;
}

export default function ContentPage({ h1, breadcrumb, children }: ContentPageProps) {
  return (
    <div className={styles.page}>
      {breadcrumb}
      <h1 className={styles.h1}>{h1}</h1>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
