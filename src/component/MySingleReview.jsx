import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from "firebase/auth";

function MySingleReview(props) {

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    return (
        <div className='mySingleReview'>
            <p>{user.displayName}</p>
            <hr />
            <p>{props.textContent}</p>
            <button onClick={()=>{
            props.del(props.myReviewNo);
        }}><i class="fa-solid fa-trash fa-xl"></i></button>
        </div>
      );
}

export default MySingleReview;