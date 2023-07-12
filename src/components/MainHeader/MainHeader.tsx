import classes from "./MainHeader.module.css";
import {Navigation} from "../Navigation/Navigation";
export function MainHeader(props: any) {
    return (
        <header className={classes['main-header']}>
            <h1>A Typical Page</h1>
            <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
        </header>
    );
}