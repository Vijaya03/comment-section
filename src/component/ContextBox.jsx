import React, { Component,useEffect,useState,useContext} from 'react';
import styled from 'styled-components';
import { UserContext } from './comment';
const Box = styled.textarea`
     grid-area:textarea;
     width:100%;
     border-radius:10px;
     min-height:130px;
     padding:10px;
     font-size:16px;
     outline: none;
     resize: none;
    //  color:var(--Moderateblue);
     @media (max-width: 500px) {
        padding:15px;
        border-color:var(--Lightgray); 
     }
`;
const placeHolder= "Add a comment..";
const ContextBox = (props) =>{
    const user = useContext(UserContext);
    const [texct, setText] = useState(user.compareUserName);
    useEffect(() => {
        if (user.compareUserName) {
            setText(user.compareUserName);
        }
    }, [user.compareUserName]);
     //const [texct, setText] = useState(props.FlagToCheckComingFromReply ? user.parentUsername :user.compareUserName);
    const handleUpdatedReply = (e) =>{
         setText(e.target.value);
        props.setInputValue(e.target.value);
    }
    
    return <Box name={props} id="textbox" onChange={handleUpdatedReply} defaultValue={"@"+texct}  placeholder={placeHolder}></Box>
}

export default ContextBox;