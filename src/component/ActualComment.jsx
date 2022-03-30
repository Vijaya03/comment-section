import React, { Component,useState,useContext } from 'react';
import styled from 'styled-components';
import ProfilePic from './ProfilePic';
import TimeStamp from './TimeStamp';
import UserName from './UserName';
import { UserContext } from './comment';
import DeleteModal from './DeleteModal';
const Root = styled.div`
    grid-area:a;
    background:var(--Verylightgray);
    display:flex;
    align-items:center;
    justify-content:center;
    gap:8px;
    flex-direction:column;
    border-radius:10px;
    height:100px;
    width:40px;
    margin:24.5px 20px 0px 20px;
    color:var(--Moderateblue);
    font-weight:500;
    font-size:16px;
    cursor:pointer;
    text-align:center;
    @media (max-width: 500px) {
        height:32px;
        width:80px;
        display:flex;
        gap:15px;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        font-size:14px;
        margin:0;
     }  
` ;
const UpRoot = styled.div`
     color:var(--Lightgrayishblue);
     :hover{
        color:var(--Moderateblue);
     }
  
`;
const DownRoot = styled.div`
     color:var(--Lightgrayishblue);
     :hover{
        color:var(--Moderateblue);
     }
`;
const Head = styled.div`
    border-radius:15px;
    grid-area:b;
    background:white;
    display:flex;
    flex-direction:row;
    justify-content: flex-start ;
    align-items:center;
    gap:20px;
    font-size:16px;
    div:nth-child(4){
        // margin-left: auto;
       
    }
    @media (max-width: 500px) {
        div:nth-child(5){
            display:flex;
            justify-content: flex-end ;
        }
        
     } 
`;

const Reply = styled.div`
  display:flex;
  cursor:pointer;
  font-size:16px;
  padding-right:30px;
  align-items:center;
  :hover{
    opacity:0.3
  }
  @media (max-width: 500px) {
    grid-area:d;
    display:flex;
    justify-content:flex-end;
    font-size:14px;
    padding-right:10px;
 }  
 
`;
const ReplyCon = styled.span`
  padding-left:5px;
  cursor:pointer;
  color:var(--Moderateblue);
  font-weight:500;
  :hover{
    color:var(--Lightgrayishblue);
  }
  @media (max-width: 500px) {
    grid-area:d;
    display:flex;
    justify-content:flex-end
    font-size:14px;
 }
`;
const CommentSection = styled.div`
    grid-area:c;
    font-size:16px;
    width:100%;
    display:flex;
    align-self:stretch;
    color:var(--GrayishBlue);
    overflow: auto;
    padding-right: 5px;
    @media (max-width: 500px) {
        padding-top:10px;
        padding-bottom:12px;
        overflow: auto;
     }
`;
const DeleteButton = styled.div`
  display:flex;
  cursor:pointer;
  font-size:16px;
  padding-right:30px;
  align-items:center;
  :hover{
    opacity:0.3
  }
  @media (max-width: 500px) {
    grid-area:d;
    display:flex;
    justify-content:flex-end;
    font-size:14px;
    padding-right:10px;
 }  
`;
const EditButton = styled.div`
    display:flex;
    cursor:pointer;
    font-size:16px;
    padding-right:30px;
    align-items:center;
    :hover{
    opacity:0.3
    }
    @media (max-width: 500px) {
    grid-area:d;
    font-size:14px;
    padding-right:10px;
    }  
`;
const DeleteCon = styled.div`
    padding-left:5px;
    cursor:pointer;
    font-weight:500;
    :hover{
    color:var(--Lightgrayishblue);
    }
    @media (max-width: 500px) {
    grid-area:d;
    font-size:14px;
    }
    color:var(--SoftRed);
`;
const EditCon = styled.div`
    padding-left:5px;
    cursor:pointer;
    color:var(--Moderateblue);
    font-weight:500;
    :hover{
    color:var(--Lightgrayishblue);
    }
    @media (max-width: 500px) {
    grid-area:d;
    display:flex;
    justify-content:flex-end
    font-size:14px;
    }
`;
const UpdateTextarea = styled.textarea`
    grid-area:c;
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
`
const UpdateButton = styled.button`
    justify-content:center;
    align-items:center;
    border:transparent;
    align-self: flex-end;
    width:90px;
    height:40px;
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
        width:90px;
        height:35px;
        justify-content:center;
        align-items:center;
    }
`
const UpdateCon = styled.div`
    width:90px;
    height:45px;
    font-size:16px;
    border-radius:7px;
    border:transparent;
    align-item:center;
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
`
function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');
    if (indexOfSpace === -1) {
      return '';
    }
    return str.substring(indexOfSpace + 1);
  }
  

var replyCard = false;
var splitText = "";
const ActualComment = (props) =>{
    const user = useContext(UserContext);
    const [changeRoot,setchangeRoot] = useState(props.content.score);
    const [updatedText,setUpdatedText] = useState("");
    function handleUpdate(e){
        setUpdatedText(e.target.value);
    }
    return <>
                <Root>
                    <UpRoot onClick={(e)=>{
                        e.stopPropagation();
                        setchangeRoot(changeRoot+1);
                        props.content.score = props.content.score + 1;}}>
                    +</UpRoot>
                    {changeRoot}
                    <DownRoot onClick={(e)=>{
                        e.stopPropagation();
                        setchangeRoot(changeRoot-1);
                        props.content.score = props.content.score - 1;
                    } }>-</DownRoot>
                </Root>
                <Head>
                    <ProfilePic replyCard={replyCard} pic={props.content.user.image} ></ProfilePic>
                    <UserName name={props.content.user.username} data={props.dhata}></UserName>
                    <TimeStamp time={props.content.createdAt}></TimeStamp>
                </Head>
                <div className="deleteEditSection" style={{
                    flexDirection:"row",
                    display:props.content.user.username==props.dhata.currentUser.username? "flex":"none",
                    justifyContent:"flex-end"}}>
                    <DeleteButton onClick={()=>{
                        user.setIdForDelete(props.content.id);
                        user.setisOpenDeleteModal(true)}}>
                        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        <DeleteCon>Delete</DeleteCon>
                    </DeleteButton>
                    <DeleteModal children={user.idForDelete} onClose={()=>user.setisOpenDeleteModal(false)} isOpenDeleteModal={user.isOpenDeleteModal}></DeleteModal>
                    <EditButton onClick={()=>{user.setEnableEditBox(!user.enableEditBox)
                        user.setEditBoxId(props.content.id)
                        console.log(props.content.id)
                    }}>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                    <EditCon>Edit</EditCon>
                    </EditButton>
                </div>
                <Reply
                 style={{display:props.content.user.username==props.dhata.currentUser.username? "none":""}}
                 onClick={()=>{props.setCommentReply(!props.commentReply);
                                     props.setcompareUserName(props.content.user.username);
                                     props.setparentUsername(props.fromReplyCardUser)
                                     }}>
                        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                        <ReplyCon>Reply</ReplyCon></Reply>
                            {/* {console.log(props.content.content.slice(1))} */}
                <CommentSection
                 style={{display:props.content.id==user.editBoxId && user.enableEditBox ? "none":"flex"}}
                 >
                 <span>
                 <span style={{color:props.content.content.charAt(0) == "@" ? "var(--Moderateblue)": "",
                             fontWeight:props.content.content.charAt(0) == "@" ? "500": "" }}>
                             {props.content.content.charAt(0) == "@" ?  props.content.content.split(" ")[0] : props.content.content}</span> 
                    &nbsp;{removeFirstWord(props.content.content)}
                 </span>
                   
                </CommentSection>
                <div
                 style={{  marginRight: "30px",
                           gridArea:"c",
                           flexDirection:"column",
                           gap:"12px",
                           marginTop:"10px",
                           marginBottom:"10px",
                           display:props.content.id==user.editBoxId && user.enableEditBox ? "flex":"none"}}>
                    <UpdateTextarea onChange={handleUpdate} defaultValue={props.content.content}></UpdateTextarea>
                    <UpdateButton onClick={()=>{
                        user.dhata.comments.map(items=>{
                            if(items.replies.length>0){
                                items.replies.map(a=>{
                                    if(updatedText!=""){
                                        if(a.id==user.editBoxId) {
                                            a.content = updatedText;
                                        }
                                    }
                                })
                            }
                        })
                        user.setData(user.dhata);
                        user.setEnableEditBox(!user.enableEditBox)
                    }} >
                       Update
                    </UpdateButton>
                </div>
           </>
          
}
export default ActualComment;