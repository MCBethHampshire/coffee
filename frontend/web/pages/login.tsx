import Link from 'next/link';
import Header from '../components/header';
import styles from '../styles/Login.module.css';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { selectUser, login } from '../services/userSlice';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export type LoginForm = {
    identifier: string;
    password: string;
};

const Login: NextPage = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors} , 
    } = useForm<LoginForm>();

    const router = useRouter();

    const { jwt, error, username, userType } = useSelector<RootState, RootState["user"]>(selectUser);
    console.log(jwt, username);

    const dispatch = useDispatch<AppDispatch>();

    if (Boolean(jwt) && !error) {
        router.push("/user");
    }

    const onSubmit = (data: LoginForm) => {
        console.log(data);
        dispatch(login(data));
    };

    return <>

    <Header username={username} userType={userType} />
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h3>
                {error?.message}
            </h3>
            <div className={styles.formGroups}>
                <div className={styles.formGroup}>
                    <label htmlFor="email"> Email</label>
                    <input 
                    id="email"
                    placeholder="Enter your email"
                    role="textbox"
                    {...register("identifier", {
                        required: 'Required', 
                        minLength: {value: 6, message: "Min length 6"}, 
                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"},
                        })}/>
                    {errors.identifier ? <span className={styles.error}>{errors.identifier?.message}</span> : <>&nbsp;</>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                    id="password"
                    placeholder="Enter your password" 
                    role="textbox"
                    type="password" 
                    {...register("password", {
                        required: 'Required', 
                        minLength: {value: 8, message: "Min length 8"},
                        })}/>
                    {errors.password ? <span className={styles.error}>{errors.password?.message}</span> : <>&nbsp;</>}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button type="submit">Sign in</button>
                <Link href="/signup">
                    <span>Create account</span>
                </Link>
            </div>
        </form>
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
        
    </>;
};

export default Login;
