import Link from 'next/link';
import Header from '../components/header';
import styles from '../styles/Login.module.css';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';

export type SignupForm = {
    username: string;
    email: string;
    password: string;
};

const Signup: NextPage = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors} , 
    } = useForm<SignupForm>();

    const onSubmit = (data: SignupForm) => {
        console.log(data);
    };

    return <>
      <Header />
      Sign up
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroups}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input 
                    id="username"
                    placeholder="Enter your username"
                    role="textbox"
                    {...register("username", {
                        required: 'Required', 
                        minLength: {value: 6, message: "Min length 6"}, 
                        })}/>
                    {errors.username ? <span className={styles.error}>{errors.username?.message}</span> : <>&nbsp;</>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                    id="email"
                    placeholder="Enter your email"
                    role="textbox"
                    {...register("email", {
                        required: 'Required', 
                        minLength: {value: 6, message: "Min length 6"},
                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"}, 
                        })}/>
                    {errors.email ? <span className={styles.error}>{errors.email?.message}</span> : <>&nbsp;</>}
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
                <button type="submit">Create</button>
                <div>
                    <p>Already have an account?</p>
                    <Link href="/login">
                        <span>Login</span>
                    </Link>
                </div>
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

export default Signup;
