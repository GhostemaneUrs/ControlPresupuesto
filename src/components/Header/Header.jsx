import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container_header}>
      <h1 className={styles.title}>Expense Planner</h1>
    </div>
  );
};

export default Header;
