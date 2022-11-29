import React, { useState } from 'react';

function HallSelect(props) {
    function retHall(event){
        props.func(event.target.id);
        setSelected(event.target.id);
    }

    const [selected, setSelected] = useState();
    const selectedStyle = {
        backgroundImage: "linear-gradient(to bottom right, #b92b27, #1565C0)",
    }


  return (
    <div className='hallSelect'>
        <div className='hallOptions' onClick={retHall} id="INOX" style={selected==="INOX"? selectedStyle : null}>INOX</div>
        <div className='hallOptions' onClick={retHall} id="INSIGNIA" style={selected==="INSIGNIA"? selectedStyle : null}>INSIGNIA</div>
        <div className='hallOptions' onClick={retHall} id="CINEMAX" style={selected==="CINEMAX"? selectedStyle : null}>CINEMAX</div>
        <div className='hallOptions' onClick={retHall} id="SWABHUMI" style={selected==="SWABHUMI"? selectedStyle : null}>SWABHUMI</div>
    </div>
  )
}

export default HallSelect;