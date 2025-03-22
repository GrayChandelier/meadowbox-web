import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { useEffect, useRef, useState } from 'react';

import {SidePanel} from './SidePanel';
import { Contentboard } from "./Contentboard/Contentboard";


export function App() {

  let contentSide = useRef<HTMLDivElement | null>(null);
  let [state, setState] = useState({
      authenticated: false,
      currentWindow: "none",
      sidePanelShows: "main"
  });

  useEffect(() => {

    if (contentSide && contentSide.current) 
      {
        contentSide.current.style.backdropFilter = state.currentWindow != "none" ? "blur(5px) brightness(0.7)" : "blur(0px) brightness(1)"; // Применяем размытие
      }

  }, [state.currentWindow]);

  return (
    <Router>
  
    <div style={{
      display: "flex",
    }}>

       <div ref={contentSide} className={styles.contentSide}>
        <Contentboard state={state} setState={setState}/>
      </div>

        
          
      <SidePanel state={state} setState={setState}/>
        
    </div>
    </Router>
  )
}
