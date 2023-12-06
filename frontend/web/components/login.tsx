import styles from '../styles/Login.module.css';
import { useForm } from 'react-hook-form';

export type LoginForm = {
    identifier: string;
    password: string;
};

const Login = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors} , 
    } = useForm<LoginForm>();

    const onSubmit = (data: LoginForm) => {
        console.log(data);
    };

    return <>
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                <a>Create account</a>
            </div>
        </form>
    </div>
        
    </>;
};

export default Login;
