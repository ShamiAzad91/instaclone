import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import M from "materialize-css"

const Signup = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();

const PostData = ()=>{
  console.log(name,email,password);
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    return M.toast({html:"invalid email",classes:"#c62828 red darken-3"});   
  }
  fetch("http://localhost:8000/api/signup",{
    method:"post",
    body:JSON.stringify({name,email,password}),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
  .then(data=>{
    // console.log(data);
    if(data.error){
      M.toast({html:data.error,classes:"#c62828 red darken-3"})
    }else{
      M.toast({html:data.message,classes:"#388e3c green darken-2"})
      navigate("/signin")
    }
  }).catch((err)=>{
    console.log(err)
  })
}


  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="name" value={name}  onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="email"   value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password"  value={password}  onChange={(e)=>setPassword(e.target.value)}/>

        <button onClick={PostData} className="btn waves-effect waves-light #0d47a1 blue darken-3">
          Signup
        </button>
        <h5>
          <Link to="/signin">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
