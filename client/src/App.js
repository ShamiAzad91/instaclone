import React, { createContext, useContext, useEffect, useReducer } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";

import { reducer, initialState } from "./reducers/userReducers";
 
 export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("hi",user)
    if(user){
      dispatch({type:"USER",payload:user})
      // navigate("/")
    }else{
      navigate("/signin")
    }

  },[])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />

    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
