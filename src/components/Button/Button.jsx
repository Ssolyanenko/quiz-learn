import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, onClick, disabled }) => {
    return (
        <button
            className={styles.customButton}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

