import {Card} from "../UI/Card/Card";
import {Button} from "../UI/Button/Button";
import classes from './Login.module.css'
import React, {useState, useEffect} from "react";

export function Login(props: any) {

    /*const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);*/

    const [formContent, setFormContent] = useState({
        email: '',
        isEmailValid: undefined,
        password: '',
        isPasswordValid: undefined,
        isFormValid: false
    });

    useEffect(() => {
        console.log('Effect runnign')
    })

    useEffect(() => {
        setTimeout(() => {
            console.log('validity check')
            setFormContent((prevState: any) => {
                return {
                    ...prevState,
                    isFormValid: formContent.email.includes('@') && formContent.password.trim().length > 6
                }
            });
        }, 500);
        return () => console.log('CLEAUNP function');
    }, [formContent.email, formContent.password]);

    function OnEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormContent((prevState: any) => {
            return {
                ...prevState,
                email: event.target.value,
                //isFormValid: event.target.value.includes('@') && formContent.password.trim().length > 6
            }
        });
    }

    function OnPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormContent((prevState: any) => {
            return {
                ...prevState,
                password: event.target.value,
                // isFormValid: event.target.value.trim().length > 6 && formContent.email.includes('@')
            }
        });
    }

    function validateEmailHandler() {
        setFormContent((prevState: any) => {
            return {
                ...prevState,
                isEmailValid: formContent.email.includes('@')
            }
        });
    }

    function validatePasswordHandler() {
        setFormContent((prevState: any) => {
            return {
                ...prevState,
                isPasswordValid: formContent.password.trim().length > 6
            }
        });
    }


    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        /*props.onLogin(enteredEmail, enteredPassword);*/
        props.onLogin(formContent);
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        formContent.isEmailValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={formContent.email}
                        onChange={OnEmailChange}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        formContent.isPasswordValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={formContent.password}
                        onChange={OnPasswordChange}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formContent.isFormValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}