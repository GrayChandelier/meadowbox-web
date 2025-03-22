import { RefObject, useRef } from "react";
import styles from "./App.module.scss"
import { useNavigate } from "react-router-dom";

export function SidePanelNavigation({state, setState})
{
    const navigate = useNavigate();
    return (
        <div className={styles.sidePanelNavigation}>

        <div className={styles.Navigation}>
               
        <button className={styles.navButton} onClick={() => navigate("/profile")}>Profile</button>
        <button className={styles.navButton} onClick={() => navigate("/servers")}>Servers</button>

        <button className={styles.navButton} onClick={() => navigate("/store")}>Store</button>
        <button className={styles.navButton} onClick={() => navigate("/forum")}>Forum</button>

        <button className={styles.navButton} onClick={() => navigate("/feedback")}>Feedback</button> 
        <button className={styles.navButton} onClick={() => navigate("/launcher")}>Launcher</button>
        
        </div>

        <button className={styles.accentButton} onClick={() => navigate("/news")}>Home page</button>

        </div>
    )
}