import { NextPage } from "next";
import Header from "../components/header";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { selectUser, logout } from '../services/userSlice';
import { useRouter } from 'next/router';
import { useEffect } from "react";

const User: NextPage = () => {
    const { username, email, error } = useSelector<RootState, RootState["user"]>(selectUser);

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!username || Boolean(error)) {
            dispatch(logout());
            router.push("/login");
        }
    }, []);

    const logoutHandler = async () => {
        dispatch(logout);
        router.push("/");
    };

    return (username && email) ? (
    <>
        <Header />
        <h1>
            Profile
        </h1>
        <h2>Username</h2>
        <span>{username}</span>
        <h2>Email</h2>
        <span>{email}</span>
        <button onClick={logoutHandler}>Logout</button>
    </>
    ) : null;
};

export default User;