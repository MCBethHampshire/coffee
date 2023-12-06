import Login from "./login";
import Image from "next/image";
import logo from "../assets/logo.jpg";
import styles from '../styles/Header.module.css';

const Header = () => {
    return <>
    <div className={styles.container}>
        <div className={styles.nameContainer}>
            <div className={styles.logo}>
                <Image src={logo} width={90} height={95} alt="Face logo"/>
            </div>
            <header className={styles.header}>FACE</header>
        </div>
    
        <Login />
    </div>
       
    </>;
};

export default Header;
