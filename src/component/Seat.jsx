import React, { useState } from 'react';

function Seat(props) {

    const selectedStyle = {
        backgroundImage: "linear-gradient(90deg, #b92b27, #1565C0)",
    }

    const [clicked, setClicked] = useState(false);
    // const [seatStatus, setSeatStatus] = useState(props.status)

    function handleClick(event){
        var seatStatus = props.status;
        if (seatStatus === 1){
            alert("Seat Unavailable");
        }
        else{
            var row = event.target.parentElement.id;
            var col = event.target.id;
            if (clicked === false){                
                setClicked(true);
                props.addFunc(row, col);
            }
            else{
                setClicked(false);
                props.removeFunc(row, col);
            }
        }
    }

  return (
    <button className={props.classnamep} 
        id={props.idp} 
        onClick={handleClick}
        style={props.status===1? null : clicked? selectedStyle : null}
    >SEAT</button>
  )
}

export default Seat;