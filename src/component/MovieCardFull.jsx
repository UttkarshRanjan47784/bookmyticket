import React from 'react';
import movieList from '../data/movieDetails';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

function MovieCardFull(props) {

    var user;
    onAuthStateChanged(auth, (currentUser)=>{
        user = currentUser;
        console.log(user);
    })

    var mID = props.movieID;
    
    return(
        <div className='movieCardFull'>
            <img 
                src={movieList[mID].imgSrc}
                alt={movieList[mID].movieName + " Poster"} />
            <div className='movieCardFullDesc'>
                <h1>{movieList[mID].movieName}</h1>
                <hr />
                <h2>Directed By : {movieList[mID].director}</h2>
                <hr />
                <h2>Actors : ACTORS</h2>
                <hr />
                <h2 id='rating'>Viewer Rating : {movieList[mID].rating}</h2> <h2 id='age'>Age Rating : {movieList[mID].ageRating}</h2>
                <hr />
                <p>{movieList[mID].desc}</p>
            </div>
            <Link to="/booktickets" state={{ data : mID }}><button className='ticketButton'>Buy Tickets</button></Link>
        </div>
    );
}

export default MovieCardFull;