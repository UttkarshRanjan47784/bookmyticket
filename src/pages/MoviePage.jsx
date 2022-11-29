import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../component/NavBar.jsx';
import MovieCardFull from '../component/MovieCardFull.jsx';
import MovieReviews from '../component/MovieReviews.jsx';

function MoviePage(props) {
    const loc = useLocation();
    var mID = loc.state.data;
    console.log(mID, "MoviePage MovieID");
  return (
    <div className='moviePage'>
        <NavBar />
        <div className='moviePageContentWrapper'>
          <MovieCardFull movieID={mID}/>
          <MovieReviews movieID={mID}/>
        </div>
        
    </div>
  )
}

export default MoviePage;