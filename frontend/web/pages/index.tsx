import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectUser } from '../services/userSlice';

export default function Home() {
  const {  username, userType } = useSelector<RootState, RootState["user"]>(selectUser);

  return (
    <div className={styles.container}>
      <Head>
      </Head>
      <Header username={username} userType={userType} />
      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
