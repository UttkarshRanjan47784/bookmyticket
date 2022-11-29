import React, { useState } from 'react';

function DateSelect(props) {
    const firstDay = new Date();
    const secondDay = new Date();
    secondDay.setDate(secondDay.getDate() + 1);
    const thirdDay = new Date();
    thirdDay.setDate(thirdDay.getDate() + 2);
    const fourthDay = new Date();
    fourthDay.setDate(fourthDay.getDate() + 3);
    // console.log((firstDay).toDateString(), (secondDay).toDateString(), (thirdDay).toDateString(), (fourthDay).toDateString());
    const firstDayStr = firstDay.toDateString();    
    const secondDayStr = secondDay.toDateString();
    const thirdDayStr = thirdDay.toDateString();
    const fourthDayStr = fourthDay.toDateString();
    const [selected, setSelected] = useState();
    const selectedStyle = {
        backgroundImage: "linear-gradient(90deg, #b92b27, #1565C0)",
    }

    function retDate(event){
        props.func(event.target.id);
        setSelected(event.target.id);
    }

  return (
    <ul className='dateSelect'>
        <li onClick={retDate} id={firstDayStr} style={selected===firstDayStr? selectedStyle : null}>{firstDayStr}</li>
        <li onClick={retDate} id={secondDayStr} style={selected===secondDayStr? selectedStyle : null}>{secondDayStr}</li>
        <li onClick={retDate} id={thirdDayStr} style={selected===thirdDayStr? selectedStyle : null}>{thirdDayStr}</li>
        <li onClick={retDate} id={fourthDayStr} style={selected===fourthDayStr? selectedStyle : null}>{fourthDayStr}</li>
        
    </ul>
  )
}

export default DateSelect;