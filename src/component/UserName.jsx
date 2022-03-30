import React, { Component } from 'react';
import styled from 'styled-components';
const Uname= styled.div`
  font-weight:500;
`;
const CurrentUserBadge = styled.button`
height:16px;
font-size:10px;
font-weight:500;
padding:1px 5px 1px 5px;
background:var(--Moderateblue);
color:var(--White);
border:transparent;
border-radius:1px;
`;
const UserName = (props) =>{
    return <><Uname>{props.name}</Uname>
     <CurrentUserBadge className="w3-btn" style={{display:props.name==props.data.currentUser.username? "block":"none"}}>you</CurrentUserBadge>
    </>
}
export default UserName;