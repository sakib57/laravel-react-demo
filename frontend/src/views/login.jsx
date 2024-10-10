import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../lib/axiosClient";
import { useStateContext } from "../contexts/contextProvider";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const submit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const errResponse = err.response;
                if (errResponse && errResponse.status === 422) {
                    console.log(errResponse.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={submit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Do not have account?{" "}
                        <Link to="/register">Create Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
