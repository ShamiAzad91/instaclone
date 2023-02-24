import React,{useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext);
  const renderList = ()=>{
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">CreatePost</Link></li>,
        <li>
          <button onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            navigate("/signin")

          }} className="btn #c62828 red darken-3">
          logout
        </button>
        </li>
      ]

    }else{
  return[
    <li><Link to="/signin">Signin</Link></li>,
    <li><Link to="/signup">signup</Link></li>
  ]
    }
  }
  return (
  <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
      {renderList()}
    

      </ul>
    </div>
  </nav>
  )
}

export default Navbar