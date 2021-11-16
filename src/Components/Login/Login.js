import React ,{useContext, useState} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import {firebaseContext} from '../../store/context'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router';


function Login() {
  const history = useHistory()
  const [email , setEmail] = useState('')
  const [pass , setPass] = useState('')
  const handleLogin = (e)=>{
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
   .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    history.push('/')
    // ...
  }).catch((err)=>{
    alert("No such user")
  })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit = {(e)=>{ handleLogin(e)}}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            onChange = {
             (e)=>{
               setEmail(e.target.value)
             } 
            }
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange = {
             (e)=>{
               setPass (e.target.value)
             } 
            }
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
