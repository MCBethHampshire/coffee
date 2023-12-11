import Image from "next/image";
import logo from "../assets/logo.jpg";
import styles from '../styles/Header.module.css';
import Link from "next/link";
import { FC } from "react";
import NavigationMenu from "./navigation-menu";

type Props = {
    username: string
}

const Header:FC<Props> = ({username}: Props) => {
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

        <NavigationMenu username={username}/>

        <div className={styles.buttonContainer}>
            {username ? 
                <div>
                    <Link href="/user">
                    <button>Account</button>
                    </Link>
                </div>
            : 
                <div>
                    <Link href="/login">
                        <button>Log in</button>
                    </Link>
                    <Link href="/signup">
                        <button>Sign up</button>
                    </Link>
                </div>
            }
        </div>
    </div>
       
    </>;
};

export default Header;
