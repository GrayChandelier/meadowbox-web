import { RefObject, useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import styles from "../App.module.scss";
import mStyle from "./App.profile.module.scss";

export default function Item({image_src, description})
{

    return (
        <div className={mStyle.item}>
            <div src={image_src} className={mStyle.itemImage}></div>
            <div className={mStyle.itemDescription}>{description}</div>
        </div>
    );
}