import React,{useState,useContext} from "react";
import {Link,useNavigate} from "react-router-dom";
import M from "materialize-css";
import {UserContext} from "../../App";

const Signin = () => {
  const {state,dispatch} = useContext(UserContext)
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();

const PostData = ()=>{
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    return M.toast({html:"invalid email",classes:"#c62828 red darken-3"});   
  }
  console.log(email,password);

  fetch("http://localhost:8000/api/signin",{
    method:"post",
    body:JSON.stringify({email,password}),
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  }).then(res=>res.json())
  .then((data)=>{
    console.log(data)
    if(data.error){
      M.toast({html:data.error,classes:"#c62828 red darken-3"})
    }else{
      localStorage.setItem("jwt",data.auth);
      localStorage.setItem("user",JSON.stringify(data.user));
      dispatch({type:"USER",payload:data.user})
      M.toast({html:data.message,classes:"#388e3c green darken-2"})
      navigate("/")
    }
  }).catch((err)=>{
    console.log(err)
  })
}


  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email"   value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password"  value={password}  onChange={(e)=>setPassword(e.target.value)}/>

        <button onClick={PostData} className="btn waves-effect waves-light #0d47a1 blue darken-3">
          Signin
        </button>
        <h5>
          <Link to="/signup">Donot have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
