import {Card} from "../UI/Card/Card";
import classes from "./Home.module.css";

export function Home(props: any) {
    return (
        <Card className={classes.home}>
            <h1>Welcome back!</h1>
        </Card>
    )
}