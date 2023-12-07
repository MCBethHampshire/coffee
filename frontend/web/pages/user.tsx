import { NextPage } from "next";
import Header from "../components/header";

const User: NextPage = () => {
    const userMock = { username: "Test name", email: "test email" };

    const logoutHandler = async () => {
        console.log('logout');
    };

    return <>
        <Header />
        <h1>
            Profile
        </h1>
        <h2>Username</h2>
        <span>{userMock.username}</span>
        <h2>Email</h2>
        <span>{userMock.email}</span>
        <button onClick={logoutHandler}>Logout</button>
    </>
};

export default User;