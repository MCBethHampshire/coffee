import Link from 'next/link';
import styles from '../styles/NavigationMenu.module.css';
import { FC } from "react";

type Props = {
    username: string
}

const NavigationMenu:FC<Props> = ({username}: Props) => {
    return <>
        <nav className={styles.container}>
            <ol className={styles.group}>
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
            { username ?
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
