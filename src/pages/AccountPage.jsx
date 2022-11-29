import React, { useState } from 'react';
import Navbar from '../component/NavBar.jsx';
import { motion } from 'framer-motion';
import { auth } from '../firebase-config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';
import movieList from '../data/movieDetails.jsx';

function AccountPage(props) {
    const [user, setUser] = useState({})
        onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    });


    const logout = ()=>{
        signOut(auth);
        window.location.replace('/');
    }
// setTickets
    const [ticketsList, setTicketList] = useState([]);
    const [displayTickets, setDisplayTickets] = useState(false);
    const handleClick = async ()=>{
        const docRef = await getDoc(doc(db, "userData", user.uid));
        if (docRef.exists()){
            
            if (docRef.data().tickets.length !== 0){
                setTicketList(docRef.data().tickets);
                setDisplayTickets(!displayTickets);
            }
            else
                alert("You have not bought any tickets yet :(")
        }
    }

    function displayTicketList(ticketListItem, index){
        return <div className='ticketDisplayItem' key={index} id={index} onClick={displayEachTicketBool}>
            {ticketListItem.movieName} <br/>
            {ticketListItem.showDate}
        </div>
    }

    const [tickets, setTickets] = useState([]);
    const [displayEachTicket, setDisplayEachTicket] = useState(false);
    
    function displayEachTicketBool(event){
        var num = event.target.id;
        console.log(ticketsList[num].ticketIDs);
        setTickets(ticketsList[num].ticketIDs);
        setDisplayEachTicket(!displayEachTicket);
    }
    function displayEachTicketFunc(ticket, index){
        return <div className='eachTicketDisplayItem' key={index} id={index}>
            <h1>{ticket.split("_")[2]} : {movieList[ticket.split("_")[3]].movieName}</h1>
            <p>Seat Row: {ticket.split("_")[4]} Seat Column: {ticket.split("_")[5]}</p>
        </div>
    }

  return (
    <div className='accountPage'>
        <Navbar />
        <div className='accountPageWrapper'>
            <motion.div className='accountPageItem accountOptions' animate={{scale:1}} initial={{scale:0}} transition={{duration: 0.5, delay: 0.5}}>
                {user? <h1>{user.displayName}</h1> : <h1>Login</h1>}
                <hr />
                {user? <p onClick={handleClick}>Show My Tickets</p>: null}
                {user? <p onClick={logout}>SignOut</p>: <Link to="/"><p>Login</p></Link>}
                <hr />
            </motion.div>
            {displayTickets? <div className='ticketsDisplay'>
                {ticketsList.map(displayTicketList)}
            </div> : null}
            {displayEachTicket? <div className='eachTicketsDisplay'>
                {tickets.map(displayEachTicketFunc)}
            </div> : null}
        </div>
    </div>
    
  )
}

export default AccountPage;