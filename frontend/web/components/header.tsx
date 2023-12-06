import Image from "next/image";
import logo from "../assets/logo.jpg";
import styles from '../styles/Header.module.css';
import Link from "next/link";

const Header = () => {
    return <>
    <div className={styles.container}>
        <div className={styles.nameContainer}>
            <Link href="/">
                <div className={styles.logo}>
                    <Image src={logo} width={70} height={75} alt="Face logo"/>
                </div>
            </Link>
            <header className={styles.header}>FACE</header>
        </div>
        <div className={styles.buttonContainer}>
            <Link href="/login">
                <button>Log in</button>
            </Link>
            <button>Sign up</button>
        </div>
    </div>
       
    </>;
};

export default Header;
