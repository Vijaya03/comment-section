import React, { Component,useEffect,useState,createContext  } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import data from '../data.json';
import ActualComment from './ActualComment';
import Replytemplate from './Replytemplate';
export const UserContext = createContext();
const Main = styled.div`
    background: var(--Verylightgray);
    font-size:20px;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
`
const Card = styled.div`
    top:0;
    left: 0; 
    right: 0; 
    margin-top:30px;
    margin-left: auto; 
    margin-right: auto; 
    max-width:700px;
    min-height:200px;
    background:white;
    border-radius:15px;
    backgound:white;
    font-family:var(--rubik);
    display:grid;
    grid-template-columns: 80px 1fr ;
    grid-template-areas:"a b d"
                        "a c c";
    // overflow:auto;                   
     @media (max-width: 768px) {
        min-width:300px;
        margin-left: 30px; 
        margin-right: 30px;; 
     }  
     @media (max-width: 500px) {
        min-height:250px;
        padding:15px;
        display:grid;
        grid-template-rows: auto;
        grid-template-column:1fr ;
        grid-template-areas:"b b"
                            "c c"
                            "a d ";
     }                   
`;

const SetReply = styled.div`
     display:grid;
     grid-template-columns: 70px 1fr ;
     grid-template-areas:"e f";
     margin-left: auto; 
     margin-right: auto; 
     top:0;
     left: 0; 
     right: 0; 
     max-width: 700px;
     @media (max-width: 768px) {
        grid-template-columns:20px 1fr ;
        min-width:200px;
        margin-left: 30px; 
        margin-right: 30px;; 
     }  
     @media (max-width: 500px) {
        min-width:200px;
     }    
                            
`;
const VerticleLine = styled.div`
     grid-area:e;
     margin-right:30px;
     margin-left: auto;
     min-height: 220px;
     @media (max-width: 768px) {
        margin-right: auto; 
     } 
     @media (max-width: 500px) {
        margin-left: 0;
        min-height: 290px; 
     } 
`;

const Comment = ()=>{
    // console.log(data);
    const [commentReply,setCommentReply] = useState(false);
    const [compareUserName,setcompareUserName] = useState("");
    const [parentUsername,setparentUsername] = useState("");
    const [dhata,setData] = useState(data);
    localStorage.setItem('data', dhata.comments);
    const [isOpenDeleteModal , setisOpenDeleteModal] = useState(false);
    const [idForDelete, setIdForDelete] = useState("");
    const [enableEditBox,setEnableEditBox] = useState(false);
    const [editBoxId,setEditBoxId] = useState("");
    const manageUser = {editBoxId,setEditBoxId,enableEditBox,setEnableEditBox,idForDelete,setIdForDelete,isOpenDeleteModal,setisOpenDeleteModal,parentUsername,setparentUsername,compareUserName,setCommentReply,setcompareUserName,data,setData,dhata}
   
    useEffect(() => {
        setData(manageUser.dhata)
    }, [manageUser.dhata]);
    const ReUseCard = styled.div`
    grid-area:f;
    top:0;
    left: 0; 
    right: 0; 
    margin-top:30px;
    min-width: 630px;
    min-height: ${enableEditBox?'300px':'200px'};
    background:white;
    border-radius:15px;
    // max-height: 170px;
    backgound:white;
    font-family:var(--rubik);
    display:grid;
    grid-template-rows: 55px auto;
    grid-template-columns: 80px 1fr ;
    grid-template-areas:"a b d d"
                        "a c c c"
                        ;
                        
     @media (max-width: 768px) {
        min-width:300px;
     }  
     @media (max-width: 500px) {
        min-height:250px;
        padding:15px;
        display:grid;
        grid-template-rows: auto;
        grid-template-column:1fr ;
        grid-template-areas:"b b b"
                            "c c c"
                            "a d d";
     }              
`;
function compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
  }
//   setData(dhata.comments != "undefined"? dhata.comments.sort(compare): dhata.comments)
    return( 
        <UserContext.Provider value={manageUser}>
                <Main className="main">
                    {dhata.comments.sort(compare).map((item)=>
                 <>
                            <Card key={item.id} className="card">
                                <ActualComment dhata={dhata} setData={setData} fromReplyCardUser={item.user.username} setparentUsername={setparentUsername} content={item} commentReply={commentReply} setCommentReply={setCommentReply} setcompareUserName={setcompareUserName}/>
                            </Card>
                            <div>
                            <Card key={item.username} className="card"  style={{display: commentReply && compareUserName === item.user.username ? 'block': 'none'}}>
                                <Replytemplate 
                                    // FlagToCheckComingFromReply={false} 
                                    profile={data.currentUser}>
                                </Replytemplate>
                            </Card>
                            {/* <DeleteModal calledFrom={"replyNot"}setisOpenDeleteModal={setisOpenDeleteModal}onClose={()=>setisOpenDeleteModal(false)}isOpenDeleteModal={isOpenDeleteModal}></DeleteModal> */}
                            </div>
                            
                            {item.replies.length > 0 ? 
                            (item.replies.sort(compare).map((rep)=>
                            <>
                                <SetReply>
                                    <VerticleLine style={{borderLeft:"2px solid var(--Lightgray)"}}></VerticleLine>
                                    <ReUseCard  key={rep.id}>
                                        <ActualComment  dhata={dhata} setData={setData} setparentUsername={setparentUsername} content={rep} fromReplyCardUser={item.user.username} setCommentReply={setCommentReply} commentReply={commentReply} setcompareUserName={setcompareUserName}/>
                                    </ReUseCard>
                                </SetReply>   
                                <SetReply> 
                                    <VerticleLine key={Math.random()}
                                        style={{borderLeft:"2px solid var(--Lightgray)",
                                        display: commentReply && compareUserName === rep.user.username ? 'block': 'none'}}>
                                    </VerticleLine>
                                        <ReUseCard  key={rep.username}
                                            style={{display: commentReply && compareUserName === rep.user.username ?'block': 'none'}}>
                                            <Replytemplate
                                            //  FlagToCheckComingFromReply={true}
                                              profile={data.currentUser}>
                                              </Replytemplate>
                                        </ReUseCard>
                                </SetReply> 
                             
                            </>
                        ))
                        :null
                    }
               </>
            )}
           
            </Main>  
        </UserContext.Provider>
    )
}
export default Comment;