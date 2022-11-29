import React, { useState } from 'react';
import movieList from '../data/movieDetails';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from "firebase/auth";

function MovieCard(props) {
  var mID = props.movieID; 
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  });
  return (
    
    <div className='movieCard'>
          <img 
              src={movieList[mID].imgSrc}
              alt='movieIMG'
          />
         <div className='movieCardDesc'>
          <h1>{movieList[mID].movieName}</h1>
          <hr />
          <p>{movieList[mID].desc.substring(0, 631)+"..."}</p>
          {user? <Link to="/moviepage" state={{ data : mID }}><button>More Details</button></Link> : 
            <Link to="/"><button>More Details</button></Link>}
         </div>
    </div>
  )
}

export default MovieCard;