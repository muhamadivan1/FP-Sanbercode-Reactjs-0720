import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header =() =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  return(    
    <header style={{display: 'flex', justifyContent: 'space-between', padding:'5px', height:'50px', backgroundColor:'lightblue'}}>
      <img id="logo" src="/img/logo.png" width="200px" />
      <nav>
        <ul style={{textAlign:'right', float:'right', display: 'flex', justifyContent: 'space-between', listStyle:'none'}}>
          <li style={{margin:'10px'}}><Link to="/">Home</Link></li>
          <li  style={{margin:'10px'}}><Link to="/about">About </Link> </li>
          { user && <li  style={{margin:'10px'}}><Link to="/movies">Movie List Editor </Link></li> }
          { user && <li  style={{margin:'10px'}}><Link to="/games">Game List Editor </Link></li> }
          { user === null && <li  style={{margin:'10px'}}><Link to="/login">Login </Link></li> }
          { user && <li  style={{margin:'10px'}}><a style={{cursor: "pointer"}} onClick={handleLogout}>Logout </a></li> }
        </ul>
      </nav>
    </header>
  )
}

export default Header
