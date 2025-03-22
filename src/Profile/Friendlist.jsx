import { useState } from "react";
import styles from "../App.module.scss";
import mStyle from "./App.profile.module.scss";
import mStyle2 from "./App.friendlist.module.scss";

import PageController from "../PageController";



function Subscriptions()
{
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 10;
    
    return(
        <div className={mStyle2.listPage}>
            
        <input className={mStyle2.search}type="text" placeholder="Search by username"></input>

        <div className={mStyle2.profileList}>


        </div>

    <PageController lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    );
}

function Subscribers()
{
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 10;
    
    return(
        <div className={mStyle2.listPage}>
            
        <input className={mStyle2.search}type="text" placeholder="Search by username"></input>

        <div className={mStyle2.profileList}>


        </div>

    <PageController lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    );
}

function Friends()
{
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 10;
    
    let users = [];

    for(let i = 0; i < 16; i++)
    {
        users.push
        (<div className={mStyle2.profileCard}>
            <img className={mStyle2.profileAvatar}></img>

            <div className={mStyle2.profileCardBlock}>
                <p className={mStyle2.profileCardUsername}>Username</p>
                <p className={mStyle2.profileCardOnlineStatus}>offline</p>
                <div className={mStyle2.friendSinceInfo}>Friend since 21.03.2025</div>
            </div>

        </div>);
    }

    return(
        <div className={mStyle2.listPage}>
            
        <input className={mStyle2.search}type="text" placeholder="Search by username"></input>

        <div className={mStyle2.profileList}>
            {users}

        </div>

    <PageController lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    );
}

function Blacklist()
{
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 10;
    
    return(
        <div className={mStyle2.listPage}>
            
        <input className={mStyle2.search}type="text" placeholder="Search by username"></input>

        <div className={mStyle2.profileList}>


        </div>

    <PageController lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    );
}

function AllUsers()
{
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 10;
    
    return(
        <div className={mStyle2.listPage}>
            
        <input className={mStyle2.search}type="text" placeholder="Search by username"></input>

        <div className={mStyle2.profileList}>


        </div>

    <PageController lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    );
}
export default function Friendlist() {
    const [activeTab, setActiveTab] = useState("Friends");

    const tabs = ["Friends", "Subscriptions", "Subscribers",  "All users","Blacklist"];

    const shows = () =>{
        switch(activeTab)
        {
            case "Friends": return <Friends/>;
            case "Subscribers": return <Subscribers/>;
            case "Subscriptions": return <Subscriptions/>;
            case "Blacklist": return <Blacklist/>;
            case "All users": return <AllUsers/>;
            default: return <></>;
        }
    };

    return ( 
        <>
        <div className={mStyle2.pageSelectors}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`${mStyle2.pageSelector} ${activeTab === tab ? mStyle2.active : ""}`}
                        onClick={() => setActiveTab(tab)}
                        id={tab === "All users" ? mStyle2.GapButton: undefined}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {shows()}
        
        </>
    );
}