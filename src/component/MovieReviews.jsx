import React, { useState } from 'react';
import reviewList from '../data/reviewList';
import SingleReview from './SingleReview';
import MySingleReview from './MySingleReview';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function MovieReviews(props) {

    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        console.log(user);
    })

    var mID = props.movieID;
    var rList = [...reviewList[mID].reviews];

    var [myReviewList, setMyReviewList] = useState([]);

    var [myReview, setMyReview] = useState("");
    function handleChange(event){
        setMyReview(event.target.value);
        console.log(myReview);
    }
    function removeMyReview(myReviewNo){
        setMyReviewList(()=>{
            return myReviewList.filter((myReview, index)=>{
                return (index !== myReviewNo);
            });
        })
    }

    async function handleSubmit(event){
        event.preventDefault();
        setMyReviewList((prevValue)=>{
            return [myReview, ...prevValue];
        });
        setMyReview("");
    }


  return (
    <div className='movieReviews'>
        { user && <div className='writeReview'>
            <textarea type="text" name="userReview" placeholder="Write a review" value={myReview} onChange={handleChange} rows="5"></textarea>
            <button type="submit" id="submitReview" onClick={myReview.length===0? null:handleSubmit}>Post Review</button>
        </div>}
        <hr id='reviewHR'/>
        <div className='readReviews'>
            {user && myReviewList.map((review, index)=>{
                return <MySingleReview key={index} myReviewNo={index} textContent={review} del={removeMyReview}/>
            })}
            {rList.map((review, index)=>{
                return <SingleReview key={index} textContent={review}/>
            })}
        </div>
        
    </div>
  )
}

export default MovieReviews