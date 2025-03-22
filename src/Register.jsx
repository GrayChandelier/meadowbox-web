import { RefObject, useRef, useEffect, useState } from "react";
import styles from "./App.module.scss"

const termsAndConditionsHREF = "";
const endpoint = '';

const tooltips = {
    required:"The field must not be empty",
    username: {
        alreadyTaken: "That's username already taken",
        incorrectLength: "Username must be 4-30 characters long",
        incorrect: "Username must contain only Latin letters, numbers, and underscores."
    },
    email: {
        alreadyTaken: "A user with this email is already registered. If this is you, use the authentication form",
        incorrect: "Email must be correct"
    },
    password: {
        incorrectLength: "The password must be at least 8 characters and no longer than 32",
        incorrect: "Only numbers, Latin letters and special characters are allowed in the password: !@#$%^&*"
    }
};


function InputWrapper({children, tooltip={text:"", isValid:false}}) 
{
    const [showTooltip, hoverIndicator] = useState(false);


    const Indicator = () => {
        return(
            <>
            {tooltip.isValid ?  
                <div onMouseEnter={() => hoverIndicator(true)} 
                onMouseLeave={() => hoverIndicator(false)} 
                className={styles.InputCorrect}>✔</div> :

                <div onMouseEnter={() => hoverIndicator(true)} 
                onMouseLeave={() => hoverIndicator(false)} 
                className={styles.InputIncorrect}>✖</div>}  
            </>
        )
    };
    return(
        <div className={styles.InputWrapper}>

            {children}  

            {tooltip.text.length > 0 ?
            <>
                <Indicator/>
                <div className={`${styles.Tooltip} ${showTooltip ? styles.visible : ''}`}>
                    <p>{tooltip.text}</p>
                </div> 
            </>: <></>}

        </div>
    )
}



function usernameValidator(value, validator)
{
    if(value.length === 0) {
        validator({text: "", isValid: false});
        return;
    }

    const regex = /^[a-zA-Z0-9_]+$/;

    if(value.length < 4 || value.length > 30)
    {
        validator({text: tooltips.username.incorrectLength, isValid: false});
        return;
    }

    if(!regex.test(value))
    {
            validator({text: tooltips.username.incorrect, isValid: false});
            return;
    }

    validator({text: "Correct!", isValid: true});
}

function emailValidator(value, validator)
{
    if(value.length === 0) {
        validator({text: "", isValid: false});
        return;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(value))
    {
        validator({text: tooltips.email.incorrect, isValid: false});
        return;
    }

        validator({text: "Correct!", isValid: true});
}

function passwordValidator(value, validator)
{
    if(value.length === 0) {
        validator({text: "", isValid: false});
        return;
    }

    const regex = /^[a-zA-Z\d!@#$%^&*]{8,32}$/;
    if(value.length < 8 || value.length > 32)
    {
        validator({text: tooltips.password.incorrectLength, isValid: false});
        return;
    }

    if(!regex.test(value))
    {
        validator({text: tooltips.password.incorrect, isValid: false});
        return;
    }

        validator({text: "Correct!", isValid: true});
}


export function Register({state, setState})
{
    //Подсказки и индикаторы
    const [username,setUsernameValid] = useState({text:"", isValid:false});
    const [email,setEmailValid] = useState({text: "", isValid:false});
    const [password,setPasswordValid] = useState({text: "", isValid:false});

    //Обработка значения input
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        agreement: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if(name == "username") {
            usernameValidator(value, setUsernameValid);
            return;
        }

        if(name == "email") {
            emailValidator(value, setEmailValid);
            return;
        }

        if(name == "password") {
            passwordValidator(value, setPasswordValid);
            return;
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // Останавливаем стандартное поведение формы
    

        if(!(username.isValid && email.isValid && password.isValid))
        {
            console.log("Fields are not valid");
            return;
        }
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Отправляем данные в формате JSON
          });
    
          if (response.ok) {
            const result = await response.json(); // Получаем ответ от сервера
            console.log('Success:', result);
          } else {
            console.error('Server error');
          }
        } catch (error) {
          console.error('Error:', error);
        }


        // setFormData({
        //     username: '',
        //     email: '',
        //     password: '',
        //     agreement: false
        // });

        // setUsernameValid({text: "", isValid: false});
        // setEmailValid({text: "", isValid: false});
        // setPasswordValid({text: "", isValid: false});

        setState(prev => ({...prev, sidePanelShows: "nav"}));
      };
    
    return (
      <div className={styles.regForm}>
            
            <form onSubmit={handleSubmit}>
            
            <div className={styles.inputFields}>

            <InputWrapper tooltip={username}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    minLength="4"
                    maxLength="30"
                />
            </InputWrapper>

            <InputWrapper tooltip={email}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    maxLength="64"
                />
            </InputWrapper>

            <InputWrapper tooltip={password}>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    minLength="8"
                    maxLength="32"
                />
            </InputWrapper>
  
            
                <div className={styles.checkboxAndLabel}>
                    <input name="agreement" 
                           className={styles.checkbox}
                           type='checkbox' 
                           id='userAgreement'
                           value={formData.agreement}
                           onChange={handleChange}>                       
                    </input>
                    <label className={styles.finePrint} htmlFor='userAgreement'>I agree to the <a href={ termsAndConditionsHREF}>Terms and Conditions</a></label>
                </div>

                <button type="submit" className={styles.accentButton}>Create an account</button>
            </div>

            
            </form>


        </div>
        
    )
}

