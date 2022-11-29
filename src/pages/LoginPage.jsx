import React, { useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config.js";
import { Link } from 'react-router-dom';

function LoginPage() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        console.log(user);
    })

    const login = async ()=>{
        try {
            await signInWithEmailAndPassword(auth, userEmail, userPassword);
            window.location.replace('/home');
        } catch (error){
            alert("Wrong Email/Password... Please Try Again");
        }
        
    }

    const logout = async ()=>{
        signOut(auth);
        window.location.replace('/');   
    }

  return (
    
    <div className="loginPage">
        <div className='titleBar'>Book My Ticket</div>
        <div className='loginPageWrapper'>
            <div className='loginForm'>
                <h1>LOGIN</h1>
                <input type="text" placeholder='Email' value={userEmail} autoComplete="off" onChange={(event)=>{
                    setUserEmail(event.target.value);
                }}></input>
                <input type="password" placeholder='Password' value={userPassword} autoComplete="off" onChange={(event)=>{
                    setUserPassword(event.target.value);
                }}></input>
                {user? <Link to="/home"><button>Proceed</button></Link> : <button onClick={login}>Login</button>}
                {user? <button onClick={logout}>SignOut</button> : null}
                <div className="newUserQuery">
                    <p>New Around Here? <Link to="/register">Sign Up!</Link></p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default LoginPage;