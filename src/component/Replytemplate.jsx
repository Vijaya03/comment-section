import React, { Component,useState } from 'react';
import styled from 'styled-components';
import ProfilePic from './ProfilePic';
import ContextBox from './ContextBox';
import ReplyButton from './ReplyButton';

const ReplyTemplateBody = styled.div`
     display:grid;
     grid-template-columns: 70px 1fr 100px;
     grid-template-areas:"pic textarea button";
     padding:30px;
     @media (max-width: 500px) {
        padding:10px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 80px;
        grid-template-areas:"textarea textarea"
                            "pic button";
    }
`;
var replyCard = true;
const Replytemplate = (props) =>{
    const [inputValue, setInputValue] = useState("");
    return <>
            <ReplyTemplateBody>
                <ProfilePic replyCard={replyCard} pic={props.profile.image} style={{width:"100px",height:"50px"}}></ProfilePic>
                <ContextBox 
                // FlagToCheckComingFromReply={props.FlagToCheckComingFromReply} 
                setInputValue={setInputValue}></ContextBox>
                <ReplyButton inputValue={inputValue}></ReplyButton>
            </ReplyTemplateBody>
           </>
    }
export default Replytemplate;