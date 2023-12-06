import styles from '../styles/Login.module.css';

const Login = () => {
    const onSubmit = () => {

    }

    return <>
    <div className={styles.container}>
        <header>Login</header>
        <form onSubmit={onSubmit}>
            <input label="Email" placeholder="Enter your email"/>
            <input label="Password" placeholder="Enter your password" type="password"/>
            <button type="submit">Sign in</button>
        </form>
    </div>
        
    </>;
};

export default Login;
