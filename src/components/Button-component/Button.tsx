import styles from "./Button.module.css";
import React from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  children?: React.ReactNode;
}
export function Button({ onClick, type, children }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type!]}`}>
      {children}
    </button>
  );
}
