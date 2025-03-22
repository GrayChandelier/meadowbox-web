import { RefObject, useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import styles from "../App.module.scss";
import mStyle from "./App.profile.module.scss";

import SkinScene from "./skinScene";
import Item from "./Item";
import Friendlist from "./Friendlist";

import Form from "./Forms";
function ProfileInfoPage({state, setState})
{
    const [form, setForm] = useState("none");

    return (
        <>
        <div className={mStyle.profileInfo}>
            <div className={mStyle.mainInfo}>
                <p>Nickname: GrayChandelier</p>
                <p>Role: admin</p>
                <p>Rating: 0</p>
                <br/>
                <p>Friends: 1</p>
                <p>Subscribers: 0</p>
                <br/>
                <p>Registered on: 15.03.2025</p>

                
                
            </div>

            <section className={mStyle.skinViewer}>
            <div className={mStyle.skinScene}>
            <SkinScene />
            
            </div>
            
            </section>

            
        </div>
        
        <div className={mStyle.editMenu}>
                <button className={mStyle.button}>Change avatar</button>
                <button className={mStyle.button} onClick={() => setForm("password")}>Change password</button>
                <button className={mStyle.button} onClick={() => setForm("username")}>Change username</button>
                <button className={mStyle.button}>Change nickname</button>
                <button id={mStyle.editSkinButton} className={mStyle.accentButton}>Change skin</button>
            </div>
            <div className={mStyle.quote}>Слышал, что скупой платит дважды. Теперь хочу работать у скупого...</div>
        <div className={mStyle.another}>

           
            **Здесь будут значки и прочая лабуда**
        </div>
        
        <Form form={form} setForm={setForm}/>
        </>
    );
}


export function Profile({state, setState})
{
    let [profileState, setProfileState] = useState({
        profilePage: "Profile info"
    });

    let page_profileInfo = () => {
        setProfileState(prev => ({...prev, profilePage: "Profile info"}));
    };

    let page_friendlist = () => {
        setProfileState(prev => ({...prev, profilePage: "Friendlist"}));
    };

    let page = () => {
        switch(profileState.profilePage)
        {
            case "Profile info":  return <ProfileInfoPage state={state} setState={setState}/>; 
            case "Friendlist":  return <Friendlist/>; 
            default: return <></>;
        }
   
    };


    return (


        <div className={mStyle.Profile}>
        <section className={mStyle.profilePanel}>

                <div className={mStyle.avatarSection}>
                    <div className={mStyle.profileAvatar}></div>
                    <div className={mStyle.username} translate="no">GrayChandelier</div>
                    <p className={mStyle.dimmed}>online</p>

                    
          
                </div>

         

                <div className={mStyle.menu}>

                    <button className={mStyle.button} onClick={page_profileInfo}>Rewards</button>
                    <button className={mStyle.button} onClick={page_friendlist}>Relations</button>
                    <button className={mStyle.accentButton} onClick={page_profileInfo}>Profile info</button>
                </div>
        </section>

        <section className={mStyle.profileContent}>

            {page()}
            
        </section>
    


        </div>
    )
}