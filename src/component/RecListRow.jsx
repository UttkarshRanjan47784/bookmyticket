import React from 'react';


function RecListRow(props) {
  return (
    <ul className='recListRow' onClick={()=>{
      props.onPress(props.mid);
    }}>
            <li id='movieName'>{props.movieName}</li>
            <li id='director'>{props.director}</li>
            <li id='rating'>{props.rating}</li>
            <li id='ageRating'>{props.ageRating}</li>
    </ul>
  )
}

export default RecListRow;