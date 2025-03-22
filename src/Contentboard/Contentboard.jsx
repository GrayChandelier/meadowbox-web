import { RefObject, useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import styles from "../App.module.scss";
import mStyle from "./App.contentboard.module.scss";

import {Register} from "../Register"
import {Profile} from "../Profile/Profile"
import { NotFound } from "../NotFound";

import PageController from "../PageController";
function Downloads()
{
    return(
        <>
        <h2>Download launcher</h2>
        <ul>
            <li><a>Windows</a></li>
            <li><a>Linux</a></li>
        </ul>
        </>
    )
}

function Article({data={author:"",header:"", description:"", image: null}})
{
    return(
        <div className={mStyle.Article}>

            <div className={mStyle.articleImageContainer}>
                {data.image != null ? <img src={data.image}></img> : <></>}
            </div>

            
            <section className={mStyle.articleDescription}>
                <h2>{data.header}</h2>
                <p>{data.description}</p>
            </section>


            <section className={mStyle.articlePanel}>

                <div className={mStyle.articleInfo}>
                    <div className={mStyle.articleAuthor}>{data.author}</div>
                </div>

                <div className={mStyle.articleActions}>
                    <button className={mStyle.articleComments}>Comments</button>
                    <button className={mStyle.articleDownvote}>Downvote</button>
                    <button className={mStyle.articleUpvote}>Upvote</button>
       
                </div>
            </section>
   
        </div>
    )
}

function Articles()
{
    
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 10;

    const article1 = {
        author: "Admin",
        image: "/meadow2.png",
        header:"What's news?", 
        description:"This article was created specifically to test the display of content on the Meadowbox project news page. This article was created specifically to test the display of content on the Meadowbox project news page. This article was created specifically to test the display of content on the Meadowbox project news page. This article was created specifically to test the display of content on the Meadowbox project news page. This article was created specifically to test the display of content on the Meadowbox project news page. "
    };

    const article2 = {
        author: "Admin",
        image:  "/background.jpg",
        header:"Meadowbox is opening!", 
        description:"No, no, it’s not open now, but the cherished day is getting closer on the calendar"
    };

    return(
        <div className={mStyle.Articles}>
            <Article data={article1}/>
            <Article data={article2}/>

            <PageController lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}></PageController>
        </div>
    )
}
export function Contentboard({state, setState})
{


 
    return(
        <div className={mStyle.Contentboard}>
            


            <Routes>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/downloads" element={<Downloads/>}/>
                <Route path="/news" element={<Articles/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

            
            
        </div>
    )
}