import React, { useState } from 'react';

function TimeSelect(props) {

    function retTime(event){
        props.func(event.target.id);
        setSelected(event.target.id);
    }

    const [selected, setSelected] = useState();
    const selectedStyle = {
        backgroundImage: "linear-gradient(to bottom right, #b92b27, #1565C0)",
    }

  return (
    <div className='timeSelect'>
        <div className='timeSlot' onClick={retTime} id="09" style={selected==="09"? selectedStyle : null}>09:00</div>
        <div className='timeSlot' onClick={retTime} id="11" style={selected==="11"? selectedStyle : null}>11:00</div>
        <div className='timeSlot' onClick={retTime} id="13" style={selected==="13"? selectedStyle : null}>13:00</div>
        <div className='timeSlot' onClick={retTime} id="16" style={selected==="16"? selectedStyle : null}>16:00</div>
        <div className='timeSlot' onClick={retTime} id="18" style={selected==="18"? selectedStyle : null}>18:00</div>
        <div className='timeSlot' onClick={retTime} id="20" style={selected==="20"? selectedStyle : null}>20:00</div>
        <div className='timeSlot' onClick={retTime} id="21" style={selected==="21"? selectedStyle : null}>21:00</div>
        <div className='timeSlot' onClick={retTime} id="23" style={selected==="23"? selectedStyle : null}>23:00</div>
    </div>
  )
}

export default TimeSelect;