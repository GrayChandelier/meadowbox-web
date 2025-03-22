import styles from "../App.module.scss";
import mStyle from "./App.profile.module.scss";

function ChangePassword({setForm})
{
    return (
        <div className={mStyle.formShadow}>
            <form className={mStyle.form}>
                <input type="password" placeholder="Current password"/>
                <input type="password" placeholder="New password"/>
                <input type="password" placeholder="Confirm new password"/>
           

                <div className={mStyle.formButtons}>
                    <button className={mStyle.button} onClick={() => setForm("none")}>Cancel</button>
                    <button className={mStyle.accentButton}type="submit">Apply</button>
                </div>
                
            </form>
        </div>

    );
}

function ChangeUsername({setForm})
{
    return (
        <div className={mStyle.formShadow}>
            <form className={mStyle.form}>
                <input type="text" placeholder="New username"/>
                
              

                <div className={mStyle.formButtons}>
                    <button className={mStyle.button} onClick={() => setForm("none")}>Cancel</button>
                    <button className={mStyle.accentButton} onClick={() => {}}>Apply</button>
                </div>
                
            </form>
        </div>

    );
}

function ChangeSkin({setForm})
{
    return (
        <div className={mStyle.formShadow}>
            <form className={mStyle.form}>
                <input type="text" placeholder="New username"/>
                
           

                <div className={mStyle.formButtons}>
                    <button className={mStyle.button} onClick={() => setForm("none")}>Cancel</button>
                    <button className={mStyle.accentButton} onClick={() => {}}>Apply</button>
                </div>
                
            </form>
        </div>

    );
}

export default function Form({form, setForm})
{
    const show = () => {
        switch(form)
        {
            case "password": return <ChangePassword setForm={setForm}/>;
            case "username": return <ChangeUsername setForm={setForm}/>;
            default: return <></>;
        }
    };
    return( <>{show()}</>);
}