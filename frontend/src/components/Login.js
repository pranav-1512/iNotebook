import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""})
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("https://i-notebook-backend-lyart.vercel.app/api/user/login", {
            method: "POST", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password}), 
          });
          const json = await response.json(); 
          if (json.success===true) {
            localStorage.setItem('token',json.authtoken)
            getUser()
            navigate("/")     
            props.showAlert("Logged In Successfully", "success")      
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }

    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    const getUser = async()=>{
        const response = await fetch(`https://i-notebook-backend-lyart.vercel.app/api/user/getuser`, {
          method: "GET", 
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }, 
        });
        const json = await response.json(); 
        console.log("User set",json)
        props.setUser({name:json.user.name, email:json.user.email, date:json.user.date})
      }
    return (
        <div className='container my-4'>
            <h2> Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
