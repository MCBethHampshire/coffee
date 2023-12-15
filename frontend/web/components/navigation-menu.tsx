import Link from 'next/link';
import styles from '../styles/NavigationMenu.module.css';
import { FC } from "react";

type Props = {
    username: string
    userType: string
}

const NavigationMenu:FC<Props> = ({username, userType}: Props) => {
    return <>
        <nav className={styles.container}>
            <ol className={styles.group}>
                <li className={styles.groupItem}>
                    <Link href="/menu">
                        Menu
                    </Link>
                </li>
                <li className={styles.groupItem}>
                    <Link href="/contact">
                        Contact
                    </Link>
                </li>
                <li className={styles.groupItem}>
                    <Link href="/shop">
                        Shop
                    </Link>
                </li>
            </ol>
            { !(userType == "Customer") && username ?
                <ol className={styles.group}>
                    <li className={styles.groupItem}>
                        <Link href="/schedule">
                            Schedule
                        </Link>
                    </li>
                    <li className={styles.groupItem}>
                        <Link href="/users">
                            Users
                        </Link>
                    </li>
                </ol>
                : null }
        </nav>
    </>;
};

export default NavigationMenu;
