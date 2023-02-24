import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import {UserContext} from "../../App";

const UserProfile = () => {
  // const [userProfile,setProfile] = useState(null);
  // const {state,dispatch} = useContext(UserContext);
  // console.log("his",state);
  const [user,setUser] = useState("");
  const [post,setPosts] = useState([])

  const {userid} = useParams();
  console.log("hi",userid)

  useEffect(()=>{
    fetch(`http://localhost:8000/api/user/${userid}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then((result)=>{
      console.log("here is my  post",result);
      // setProfile(result);
      // console.log("hello",userProfile)
      setUser(result.user);
      console.log("helo...",user);
      setPosts(result.posts);
    })
  },[])

  return (
    <>
     <div style={{maxWidth:"550px",margin:"0px auto"}}>
     <div style={{display:'flex',
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
            }}>
        <div>
          <img  style={{width:"160px",height:"160px",borderRadius:"80px"}}
          src='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'/>
        </div>
        <div>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>

          <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
            <h5>{post.length} post</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>

          </div>
        </div>

     </div>
     <div className="gallery">
      {
        post.map(item=>{
          return(
            <img className='item' src={item.photo} alt={item.title} key={item._id}/>

          )
        })
      }
     </div>
  </div>
   
    </>
  )
}

export default UserProfile
