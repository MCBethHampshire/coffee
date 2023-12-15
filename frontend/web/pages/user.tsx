import { NextPage } from "next";
import Header from "../components/header";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { selectUser, logout } from '../services/userSlice';
import { useRouter } from 'next/router';
import { useEffect } from "react";

const User: NextPage = () => {
    const { username, email, error, jwt, userType } = useSelector<RootState, RootState["user"]>(selectUser);

    console.log(username, jwt);

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!email || Boolean(error)) {
            dispatch(logout());
            router.push("/login");
        }
    }, []);

    const logoutHandler = async () => {
        dispatch(logout());
        router.push("/");
    };

    return (username && email) ? (
    <>
        <Header username={username} userType={userType} />
        <h1>
            Profile
        </h1>
        <h2>Username</h2>
        <span>{username}</span>
        <h2>Email</h2>
        <span>{email}</span>
        <h2>Role</h2>
        <span>{userType}</span>
        <button onClick={logoutHandler}>Logout</button>
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
    ) : null;
    
};

export default User;