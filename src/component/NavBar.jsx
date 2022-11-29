import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import { motion } from 'framer-motion';

function NavBar() {

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  });

  return (
    <motion.ul className='navBar' animate={{y:0}} initial={{y:-400}} transition={{duration:0.5}}>
        <li>BMT</li>
        <Link to="/home">
          <li className='nav'>Home</li>
        </Link>
        {user? <Link to="/search">
          <li className='nav'>Search</li>
        </Link> : <Link to="/">
          <li className='nav'>Search</li>
        </Link>}
        {user? <Link to="/account"><li className='nav' id="account">{user.displayName}</li></Link> : <Link to="/">
          <li className='nav' id="account">Login</li>
        </Link>}
    </motion.ul>
  )
}

export default NavBar;