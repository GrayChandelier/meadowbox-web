import { RefObject, useRef } from "react";
import styles from "./App.module.scss";
import { Auth } from "./Auth";
import {Register} from './Register'
import { SidePanelNavigation } from "./SidePanelNavigation";

function ButtonsBlock({buttons})
{
    return (
        <div className={styles.buttonsBlock}>
            <button className={styles.accentButton}  id={styles.join} onClick = {buttons.join.action}> {buttons.join.text}</button>
            <button > {buttons.forum.text} </button>
            <button > {buttons.about.text} </button>
        </div>
    )
}


export function SidePanel({state, setState})
{
    let join = () => {
        
        setState(prev => ({...prev, sidePanelShows: "auth"}));

    };

    let buttons = {
        join: {
            text: "Join",
            id: styles.join,
            action: join
        },
        forum: {
            text: "Forum",
            id: styles.goForum
        },
        about: {
            text: "About",
            id: styles.goAbout
        }
    };

    let menu = () => {
        switch(state.sidePanelShows)
        {
            case "auth": return <Auth state={state} setState={setState}/>; break;
            case "reg": return <Register state={state} setState={setState}/>; break;
            case "nav": return <SidePanelNavigation state={state} setState={setState}/>; break;
            default: return <ButtonsBlock buttons={buttons}/>
        }
    };

    return (
        <>  
        <div className={styles.sidePanel}>
            <div className={styles.brandBlock}>
                <img className = {styles.logo} src="amulet.png"/>
                <h1 translate="no">Meadowbox</h1>
            </div>
  
                {menu()}
                             
        </div>
        </>
    );
}