import { RefObject, useRef, useEffect } from "react";
import styles from './App.module.scss';

export function Auth({state, setState})
{


  let showRegForm = () => {
        
    setState(prev => ({...prev, sidePanelShows: "reg"}));

};


  const handleSubmit = async (e) => {
          e.preventDefault(); // Останавливаем стандартное поведение формы

          setState(prev => ({...prev, sidePanelShows: "nav"}));
        };

    return (
     <div className={styles.authForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputFields}>
            <input className={styles.inputText} maxLength="20" type='text' placeholder='Login'></input>
            <input className={styles.inputText} maxLength="32" type='password' placeholder='Password'></input>


            <p className={styles.textAsButton}>Forgot your password?</p>
            
            <div className={styles.checkboxAndLabel}>

              <input className={styles.checkbox}type='checkbox' id='rememberMe'></input>
              <label className={styles.checkboxLabel} htmlFor='rememberMe'>Remember me</label>
              

            </div>
            <button type="submit" className={styles.accentButton}>Enter</button>
            <p className={styles.textAsButton} align="center" onClick={showRegForm} >Create new account</p>
          </div>
        </form>
     </div>
    );
}