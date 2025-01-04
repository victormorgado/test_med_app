import React, { useEffect, useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({userName}) => {
    
  return (
    <>
        <div class="dropdown" style={{margin: "0px 10px 0px 0px"}}>
        <button class="dropbtn">Welcome, {userName}</button>
        <div class="dropdown-content">
            <a href="/profile">Your Profile</a>
            <a href="/reports">Your Reports</a>
        </div>
        </div>
    </>
    );
};

export default ProfileCard;
