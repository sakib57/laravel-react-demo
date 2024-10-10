import { Link } from "react-router-dom";
import {useRef} from 'react'
import axiosClient from "../lib/axiosClient";
import { useStateContext } from "../contexts/contextProvider";

const Register = () => {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const {setUser,setToken} = useStateContext()
  const Submit = (e) => {
    e.preventDefault();
    // if(passwordRef.current.value !==  confirmPasswordRef.current.value){
    //   return false
    // }
    const payload  = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('/register',payload).then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    }).catch((err)=>{
      const errResponse = err.response
      if(errResponse && errResponse.status === 422){
        console.log(errResponse.data.errors)
      }
    })
};
  return (
    <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create New Account</h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
  )
}

export default Register