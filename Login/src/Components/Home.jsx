// import React, {useState} from 'react'
// import '../App.css'
// import {Link} from 'react-router-dom'

// const Home = () =>{
//   const navigate = useNavigate()
//   Axios.default.withCrendentials = true;
//   const handleLogout = () =>{
//     Axios.get('https://localhost:3000/auth/logout')
//     .then(res=>{
//       if(res.data.status){
//         navigate('/login')
//       }
//     }).catch(err=>{
//       console.log(err)
//     })
//   }


//   return (
//     <div>
      
//       <button><Link to="/dashboard">Dashboard</Link></button>
//       <br></br>
//       <button onClick={handleLogout}>Logout</button>
      
//     </div>
//   )
// }

// export default Home

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Axios from 'axios'; // Import Axios

const Home = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  Axios.defaults.withCredentials = true; // Correct the typo in Axios

  const handleLogout = () => {
    Axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <button><Link to="/dashboard">Dashboard</Link></button>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
