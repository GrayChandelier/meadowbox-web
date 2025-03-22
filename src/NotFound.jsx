import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import styles from "./App.module.scss";


export function NotFound({state, setState})
{

    return (
        <div className={styles.NotFound}>
            <div>
                <h1>404</h1>
                <p>The page not found :(</p>
            </div>
        </div>
    )
}