import React, { useState } from 'react';
import movieList from '../data/movieDetails';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

function SearchField() {
    var [searchKey, setSearchKey] = useState("");
    function changeSearchKey(event){
        var temp = event.target.value;
        setSearchKey(temp);
    }

    var [result, setResult]= useState([]);
    function changeResult(event){
        event.preventDefault();
        if (searchType === 0){
            var newResult= [];
            newResult = movieList.filter((movie)=>{
                return movie.movieName.includes(searchKey) || movie.movieName.toLowerCase().includes(searchKey);
            })
            var newResultRed = newResult.map((newRes)=>{
                return newRes.movID;
            })
            setResult(newResultRed);
        }            
        if (searchType === 1){
            var newResult= [];
            newResult = movieList.filter((movie)=>{
                return movie.director.includes(searchKey) || movie.director.toLowerCase().includes(searchKey);
            })
            var newResultRed = newResult.map((newRes)=>{
                return newRes.movID;
            })
            setResult(newResultRed);
        }
        setSearchKey("");
        
    }
    

    // 0: movie, 1:director 
    var [searchType, setSearchType]= useState(0);
    function changeSearchType(event){
        var type = event.target.id;
        setSearchType(()=>{
            if (type === 'movie')
                return 0;
            if (type === 'director')
                return 1;
        });
    }

    return (
        <div className='searchFieldWrapper'>
            <motion.ul className='searchField'  animate={{x:0}} initial={{x:-2000}} transition={{duration: 0.5, delay: 0.5}} >
            <li className='searchQuery'>
            <form onSubmit={changeResult}>
                <input 
                    name='searchQuery'
                    type="text"
                    placeholder='search'
                    onChange={changeSearchKey}
                    value={searchKey}
                />
                <input type="submit" value="search" >
                </input>
                </form>
            </li>
            <li className='searchQueryType' id='director' onClick={changeSearchType}>
                Director
            </li>
            <li className='searchQueryType' id='movie' onClick={changeSearchType}>
                Movie
            </li>
        </motion.ul>
        <div className='searchResult' >
            {result.map((mid, index)=>{
                return <MovieCard movieID={mid} key={index}/>
            })}
        </div>
        </div>
  )
}

export default SearchField;