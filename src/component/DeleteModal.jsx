import {React,useContext} from 'react'
import styled from 'styled-components';
import { UserContext } from './comment';
const DeleteStyle = styled.div`
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  z-index:1000;
  border-radius:5px;
  background:var(--White);
  padding:20px;
  font-family:var(--rubik);
  max-width:320px;
  @media (max-width: 500px) {
    width:100%;
  } 
`;
const CloseModal = styled.button`
  background:var(--GrayishBlue);
  height:35px;
  font-size:14px;
  color:white;
  border-radius:5px;
  border:transparent;
  width:100%;
  cursor:pointer;
  @media (max-width: 500px) {
    font-size:12px;
  } 
`;
const AgreeDelete = styled.button`
  height:35px;
  font-size:14px;
  color:white;
  background:var(--SoftRed);
  border-radius:5px;
  border:transparent;
  width:100%;
  cursor:pointer;
  @media (max-width: 500px) {
    font-size:12px;
  } 
`;
const DeleteHeader = styled.div`
font-size:16px;
font-weight:500;
padding-bottom:8px;
`;
const DeleteContent = styled.div`
font-size:14px;
color:var(--GrayishBlue);
padding-bottom:15px;
`;

const OverLayStyle = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background-color:grey;
opacity:0.5;
z-index:1000;
`;
const flexStyle = {
  display:"flex",
  flexDirection:"row",
  gap:"15px",
  justifyContent:"center",
 
}

export default function DeleteModal({calledFrom,setisOpenDeleteModal,isOpenDeleteModal,onClose, children}) {
  
  const user = useContext(UserContext);
  const handledelete = ()=>{
    console.log(user.data.comments)
    var filtered=[];
    console.log(children)
    user.data.comments.map(item=>{
      if(item.replies.length>0) {
      // item.replies.splice(item.replies.findIndex(a=>
      //   children.id!=a.id)
      //   ,1)
        // console.log(item.replies)
      filtered = item.replies.filter((a)=>children!=a.id) ;
      item.replies = filtered
    }
    onClose();
    // item.replies.replace(filtered)
    })
    
      // function remove(a) {return children.id!=a.id} 
    //  user.data.comments.map(item=>{
    //   (item.replies.length>0)?
    //   //  item.replies.filter(remove) 
    //   console.log(item.replies)
    //    :
    //    item.replies
    //  });
     user.setData(  user.data )
  }
  
  if(!isOpenDeleteModal) return null

  return (<>
        <OverLayStyle></OverLayStyle>
        <DeleteStyle>
            <DeleteHeader>Delete Comment</DeleteHeader>
            <DeleteContent>Are you sure you want to delete this comment? This will remove the comment and can't be undone</DeleteContent>
            <div style={flexStyle}>
              <CloseModal onClick={onClose}>NO, CANCEL</CloseModal>
              <AgreeDelete onClick={handledelete}>YES, DELETE</AgreeDelete>
            </div>
            
         </DeleteStyle>
  </>
  )
}
