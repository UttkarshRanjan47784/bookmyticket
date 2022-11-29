import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../component/NavBar.jsx';
import DateSelect from '../component/DateSelect.jsx';
import TimeSelect from '../component/TimeSelect.jsx';
import HallSelect from '../component/HallSelect.jsx';
import SeatSelect from '../component/SeatSelect.jsx';
import movieList from '../data/movieDetails.jsx';

function BookTicketsPage(props) {

    const loc = useLocation();
    var mID = loc.state.data;

    const [config, setConfig] = useState({
        date:"",
        time:"",
        hall:"",
    });

    function getDateChoice(newDate){
        setConfig((prevValue) => {
            return {
                ...prevValue,
                date : newDate.split(" ").join(""),
            }
        });
    }

    function getTimeChoice(newTime){
        setConfig((prevValue) => {
            return {
                ...prevValue,
                time : newTime,
            }
        });
    }

    function getHallChoice(newHall){
        setConfig((prevValue) => {
            return {
                ...prevValue,
                hall : newHall,
            }
        });
    }

    const x = config.date.length!==0;
    const y = config.date.length!==0 && config.time.length!==0;
    const z = config.date.length!==0 && config.time.length!==0 && config.hall.length!==0;
    const hallString = z? config.date+"_"+config.time+"_"+config.hall+"_"+mID : "";

  return (
    <div className='bookTicketsPage'>
        <NavBar />
        <h1>{movieList[mID].movieName}</h1>
        <DateSelect func={getDateChoice}/>
        <div className='ticketSelect'>
            {x?<TimeSelect func={getTimeChoice}/>:null}
            {y?<HallSelect func={getHallChoice}/>:null}
            {z? <SeatSelect hallString={hallString}/> : null}
        </div>
    </div>
  )
}

export default BookTicketsPage;