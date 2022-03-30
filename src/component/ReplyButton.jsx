import React, { Component ,useState,useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './comment';

const Button = styled.div`
     grid-area:button;
     display:flex;
     justify-content:flex-end;
     @media (max-width: 500px) {
        align-items:center;
        justify-content:flex-end;
     }
     
`;
const Btn = styled.button`
     width:90px;
     height:45px;
     font-size:16px;
     border-radius:7px;
     border:transparent;
     background:var(--Moderateblue);
     cursor:pointer;
     color:var(--White);
     :hover{
         background:var(--Lightgrayishblue);
     }
     @media (max-width: 500px) {
        width:110px;
        height:45px;
     }
`;

const ReplyButton = (props) =>{
    const user = useContext(UserContext);
    const handleUpdate = ()=>{
        // console.log(user.data);
        let yourDate = new Date();
      user.data.comments.map((item)=>{
          
          if(user.parentUsername == user.compareUserName ? item.user.username == user.compareUserName : item.user.username == user.parentUsername){
              item.replies.push({
                  "content":props.inputValue,
                  "createdAt":yourDate.toISOString().split('T')[0],
                  "id":Math.random(),
                  "score":0,
                  "user":{
                      "image":{
                          "png":user.data.currentUser.image.png,
                          "webp":user.data.currentUser.image.webp
                      },
                      "username":user.data.currentUser.username
                  }
                })
                user.setCommentReply(false);
          }
      })  
      user.setData(user.data)
    //   console.log(user.data.comments)
    }
    // console.log(user);
    return <Button><Btn onClick={handleUpdate}>REPLY</Btn></Button>
}

export default ReplyButton;