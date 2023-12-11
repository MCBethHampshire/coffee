import { NextPage } from "next";
import Header from "../components/header";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectUser } from '../services/userSlice';


const Contact: NextPage = () => {
    const { username} = useSelector<RootState, RootState["user"]>(selectUser);

    return <>
        <Header username={username}/>
        <h1>
            Contact
        </h1>
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
    </>
};

export default Contact;