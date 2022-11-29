import React, { useState } from 'react';
import NavBar from '../component/NavBar';
import HomeBody from '../component/HomeBody';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config';

function HomePage() {

  const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

  return (
    <div className='homePage'>
        <NavBar />
        <HomeBody />
    </div>
  )
}

export default HomePage;