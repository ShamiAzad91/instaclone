import React, { useEffect, useState,useContext } from 'react';
import {UserContext} from "../../App";

const Profile = () => {
  const [mypic,setmyPics] = useState([]);
  const {state,dispatch} = useContext(UserContext);
  console.log("his",state);

  useEffect(()=>{
    fetch("http://localhost:8000/api/post/mypost",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then((result)=>{
      // console.warn("here is my  post",result);
      setmyPics(result.posts)
    })
  },[])

  return (
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
            <h4>{state?state.name:"loading..."}</h4>
            <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
              <h5>40 post</h5>
              <h5>40 followers</h5>
              <h5>40 following</h5>

            </div>
          </div>

       </div>
       <div className="gallery">
        {
          mypic.map(item=>{
            return(
              <img className='item' src={item.photo} alt={item.title} key={item._id}/>

            )
          })
        }
       </div>
    </div>
  )
}

export default Profile
