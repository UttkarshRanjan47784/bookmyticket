import React, { useState } from 'react';
import RecListRow from './RecListRow';
import movieList from '../data/movieDetails';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

function HomeBody() {
    var [movID, setMovID] = useState(0);
    function GetDetailsFromRecListRow(mid){
        console.log("got from RecListRow " + mid);
        setMovID(mid);
    }
    var topTenMovies = movieList.filter((movie)=>{
        return movie.movID < 10;
    })
    return (
        <motion.div className='homeBody' animate={{y:0}} initial={{y:2000}} transition={{duration:1}}>
            <div className='movieShow'>
                <MovieCard movieID={movID} />
            </div>
            <div className='recList'>
                {topTenMovies.map((row, index)=>{
                    return <RecListRow
                    key= {index}
                    mid= {index}
                    movieName= {row.movieName}
                    director= {row.director}
                    rating= {row.rating}
                    ageRating= {row.ageRating}
                    onPress={GetDetailsFromRecListRow}
                />
                })}
            </div>
        </motion.div>
    )
}

export default HomeBody;