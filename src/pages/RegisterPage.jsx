import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

function RegisterPage() {

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    });

    const [newUser, setNewUser] = useState({
        email:"",
        username:"",
        name:"",
        age:"",
        phoneNo:"",
        password:"",
    });

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setNewUser((prevValue) =>{
            return ({
                ...prevValue,
                [name] : value,
            });
        })
    };

    const register = async () => {
        if (newUser.username.length != 0)
        {
            try {
                await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
                try {
                    updateProfile(auth.currentUser, {
                    displayName : newUser.username
                    });
                } catch (error){
                    console.log(error.message);
                }
            } catch (error){
                alert("Invalid Email :(");
            }
        } else {
            alert("Please Enter A Username")
        }
    }

    const createUserDB = async()=>{
        await setDoc(doc(db, "userData", user.uid), {
            email : user.email,
            username : user.displayName,
            name : newUser.name,
            age : Number(newUser.age),
            phoneNo : newUser.phoneNo,
        });
        window.location.replace('/home');
    }

    const logout = async ()=>{
        signOut(auth);
        window.location.replace('/');   
    }



    return (
        <div className='registerPage'>
            <div className='titleBar'>Book My Ticket</div>
            <div className='registerPageWrapper'>
                <div className='registerForm'>
                    <h1>SIGN UP</h1>
                    <input type="text" placeholder="Email" name="email" value={newUser.email} autoComplete="off" onChange={handleChange}></input>
                    <input type="password" placeholder="Password" name="password" value={newUser.password} autoComplete="off" onChange={handleChange}></input>
                    <input type="text" placeholder="Username" name="username" value={newUser.username} autoComplete="off" onChange={handleChange}></input>
                    <input type="text" placeholder="Name" name="name" value={newUser.name} autoComplete="off" onChange={handleChange}></input>
                    <input type="number" placeholder="Age" name="age" value={newUser.age} autoComplete="off" onChange={handleChange}></input>
                    <input type="text" placeholder="Phone Number" name="phoneNo" value={newUser.phoneNo} autoComplete="off" onChange={handleChange}></input>
                    {user? <button onClick={createUserDB}>Proceed</button> : <button onClick={register}>Register</button>}
                    {user? <button onClick={logout}>SignOut</button> : null}
                    <div className="newUserQuery">
                        <p>Not Your First Time? <Link to="/">Login!</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;