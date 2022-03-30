import React, { Component ,useState} from 'react';
import styled from 'styled-components';
const ProfilePic = (props) =>{
    
    const Pic = styled.div`
        grid-area:pic;
        display:flex;
        @media (max-width: 500px) {
            align-items:${props.replyCard ? "center":""};
        }
       
        `
    const Img = styled.img.attrs({
        src:`${props.pic.png}`
    })`
        width:${props.replyCard ? "40px":"30px"};
        height:${props.replyCard ? "40px":"30px"};
        @media (max-width: 500px) {
            width:30px;
            height:30px;
        }`
        ;
    return <Pic><Img alt="image" dec="profile pic"></Img></Pic>
}

export default ProfilePic;