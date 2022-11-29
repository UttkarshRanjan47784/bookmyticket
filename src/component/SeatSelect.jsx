import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import movieList from '../data/movieDetails';
import Seat from './Seat.jsx';

function SeatSelect(props) {

  const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    });
    const [hallData, setHallData] = useState(null);
    

    const[row0, setRow0] = useState([]);
    const[row1, setRow1] = useState([]);
    const[row2, setRow2] = useState([]);
    const[row3, setRow3] = useState([]);
    const[row4, setRow4] = useState([]);
    const[row5, setRow5] = useState([]);
    const[row6, setRow6] = useState([]);
    
    const getSeatMatrix = async () =>{
      const docRef = await getDoc(doc(db, "halls", props.hallString));
      if (docRef.exists()){
        setHallData(docRef.data());
        setRow0(docRef.data().row0);
        setRow1(docRef.data().row1);
        setRow2(docRef.data().row2);
        setRow3(docRef.data().row3);
        setRow4(docRef.data().row4);
        setRow5(docRef.data().row5);
        setRow6(docRef.data().row6);
      } else {
        await setDoc(doc(db, "halls", props.hallString), {
          movieName : movieList[props.hallString.split("_")[3]].movieName,
          row0 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          row1 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          row2 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          row3 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          row4 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          row5 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          row6 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      }
    }


    
    const [selectedSeatList, setSelectedSeatList] = useState([]);

    function addSeatToList(row, col){
      console.log(row, col, "selected (from outside)");
      setSelectedSeatList((prevValue) => {
        var newList = [...prevValue, {
          Row: row,
          Col: col,
        }];
        return newList;
      });
    }
    function removeSeatFromList(row, col){
      console.log(row, col, "deselected (from outside)");
      setSelectedSeatList(() =>{
        return selectedSeatList.filter((seat)=>{
          var x = false;
          if (seat.Row === row){
            if (seat.Col == col)
              x = true;
          }
          return !x;
        })
      });
    }

    function createSeatMatSeat(seatStatus, indexSeat){
      return <Seat 
        key={indexSeat}
        idp = {indexSeat} 
        status ={seatStatus} 
        // onClick ={addSeatToCart}
        classnamep ={seatStatus===1?"seatMatSeat preSelectedSeat" : "seatMatSeat unSelectedSeat"}
        addFunc={addSeatToList}
        removeFunc={removeSeatFromList}
      />
    }

    const total = selectedSeatList.length*500;
    const [paid, setPaid] = useState(false);
    const [paidSeatList, setPaidSeatList] = useState([])
    const changePaid =  ()=>{
      setPaid(true);
      selectedSeatList.map((seat)=>{
        switch (seat.Row) {
          case "0":
            var newRow = row0;
            newRow[seat.Col] = 1;
            console.log(newRow);
            setRow0(newRow)
            break;
            case "1":
              var newRow = row1;
              newRow[seat.Col] = 1;
              console.log(newRow);
              setRow1(newRow);
            break;
            case "2":
              var newRow = row2;
              newRow[seat.Col] = 1;
              console.log(newRow);
              setRow2(newRow);
            break;
            case "3":
              var newRow = row3;
              newRow[seat.Col] = 1;
              console.log(newRow);
              setRow3(newRow);
            break;
            case "4":
              var newRow = row4;
              newRow[seat.Col] = 1;
              console.log(newRow);
              setRow4(newRow);
            break;
            case "5":
              var newRow = row5;
              newRow[seat.Col] = 1;
              console.log(newRow);
              setRow5(newRow);
            break;
            case "6":
              var newRow = row6;
              newRow[seat.Col] = 1;
              console.log(newRow);
              setRow6(newRow);
            break;  
          default:
            break;
        }
      })
      setPaidSeatList(selectedSeatList);
      setSelectedSeatList([]);
    };

    const generateTickets = async ()=>{
      //push changes to halls db
      await updateDoc(doc(db, "halls", props.hallString), {
        row0 : row0,
        row1 : row1,
        row2 : row2,
        row3 : row3,
        row4 : row4,
        row5 : row5,
        row6 : row6,
      });
      var paidTicketStringList = []
      paidSeatList.map( (seat)=>{
        const ticketString = props.hallString+"_"+seat.Row+"_"+seat.Col;
        paidTicketStringList = [...paidTicketStringList, ticketString];
        // await updateDoc(doc(db, "userData", user.uid),{
        //   tickets : arrayUnion({
        //     ticketID : ticketString,
        //   }),
        // });
      });
      // push changes to tickets db
      paidTicketStringList.map(async (ticket)=>{
        await setDoc(doc(db, "tickets", ticket), {
          movieName : movieList[ticket.split("_")[3]].movieName,
          showDate : ticket.split("_")[0],
          showTime : ticket.split("_")[1],
          hall : ticket.split("_")[2],
          row : ticket.split("_")[4],
          col : ticket.split("_")[5],
          owner : user.uid,
        });
      });
      //push changes to user db
      await updateDoc(doc(db, "userData", user.uid),{
        tickets : arrayUnion({
          movieName : movieList[props.hallString.split("_")[3]].movieName,
          showDate : props.hallString.split("_")[0],
          ticketIDs : paidTicketStringList,
        }),
      });
      setHallData(null);
        setRow0([]);
        setRow1([]);
        setRow2([]);
        setRow3([]);
        setRow4([]);
        setRow5([]);
        setRow6([]);
        setSelectedSeatList([]);
        setPaid(false);
        setPaidSeatList([]);
        
    };

  return (
    <div className='seatArea'>
      <button onClick={getSeatMatrix} id="refresher">View Seat Matrix</button>
      <hr />
      {hallData===null? null : <div className='seatSelectArea'>
          <div className='seatMatRow' id="0">{row0.map(createSeatMatSeat)}</div>
          <div className='seatMatRow' id="1">{row1.map(createSeatMatSeat)}</div>
          <div className='seatMatRow' id="2">{row2.map(createSeatMatSeat)}</div>
          <div className='seatMatRow' id="3">{row3.map(createSeatMatSeat)}</div>
          <div className='seatMatRow' id="4">{row4.map(createSeatMatSeat)}</div>
          <div className='seatMatRow' id="5">{row5.map(createSeatMatSeat)}</div>
          <div className='seatMatRow' id="6">{row6.map(createSeatMatSeat)}</div>
          <div className='paymentArea'>
            <p className='paymentAreaItem'>Total Cost : {total}</p>
            {total!=0? !paid?<button className='paymentAreaItem' onClick={changePaid}>Make Payment</button>:null : null}
            {paid?<button className='paymentAreaItem' onClick={generateTickets}>Generate Ticket</button> : null}
          </div>
      </div>}
    </div>

  );

}

export default SeatSelect;