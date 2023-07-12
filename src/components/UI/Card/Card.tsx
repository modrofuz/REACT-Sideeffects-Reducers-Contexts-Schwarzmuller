import classes from "./Card.module.css";
export function Card(props: any) {
    return (
        <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    );
}