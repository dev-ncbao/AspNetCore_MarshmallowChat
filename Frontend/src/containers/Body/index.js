import { Outlet } from "react-router-dom";
//
import styles from './Body.module.css';

function Body(){
    return <div className={styles.container}>
        <Outlet/>
    </div>
}

export default Body;