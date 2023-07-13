import {Card} from "../UI/Card/Card";
import {Button} from "../UI/Button/Button";
import classes from './Login.module.css'
import React, {useState, useEffect, useReducer} from "react";

function EmailReducer(state: any, action: any) {
    console.log('EmailReducer', state, action);
    if (action.type === "USER_INPUT") {
        return {
            value: action.payload,
            isValid: action.payload.includes('@')
        }
    }
    if (action.type === "INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.includes('@')
        }
    }
    return {value: '', isValid: false}
}

function PasswordReducer(state: any, action: any) {
    console.log('PasswordReducer', state.value, action.payload);
    if (action.type === "USER_INPUT") {
        const currState = {
            value: action.payload,
            isValid: action.payload.trim().length > 6
        };
        console.log('PasswordReducer currState: ', currState);
        return currState
    }
    if (action.type === "INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.trim().length > 6
        }
    }
    return {value: '', isValid: false}
}

export function Login(props: any) {

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState(false);
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(EmailReducer, {value: '', isValid: false})
    const [passwordState, dispatchPassword] = useReducer(PasswordReducer, {value: '', isValid: false})

    useEffect(() => {
        // console.log('Effect runnign')
    })

    const {isValid: emailIsValid} = emailState
    const {isValid: passwordlIsValid} = passwordState

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(
                emailIsValid && passwordlIsValid
            );
        }, 500);

        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordlIsValid]);

    function OnEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatchEmail({type: 'USER_INPUT', payload: event.target.value});
        setFormIsValid(
            //emailState.isValid && passwordState.isValid
            event.target.value.includes('@') && passwordState.isValid
        );
    }

    function validateEmailHandler() {
        dispatchEmail({type: 'INPUT_BLUR'})
    }

    function OnPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatchPassword({type: 'USER_INPUT', payload: event.target.value})
        setFormIsValid(
            //emailState.isValid && passwordState.isValid
            event.target.value.trim().length > 6 && emailState.isValid
        );
    }

    function validatePasswordHandler() {
        dispatchPassword({type: 'INPUT_BLUR'});
    }


    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={OnEmailChange}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        (passwordState.isValid !== false ? '' : classes.invalid)
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={OnPasswordChange}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}