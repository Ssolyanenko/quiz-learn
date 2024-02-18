import React from "react";
import { useRouteError } from "react-router-dom";

import styles from "./Error.module.css";

export const Error = () => {
    const error = useRouteError();

    return (
        <div className={styles.errorGrid}>
            <h1>Oh no!</h1>
            <p>I apologize, but it seems an unexpected error has arisen.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
}

