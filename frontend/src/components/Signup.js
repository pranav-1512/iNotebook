import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email:"", password:""})
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("https://i-notebook-backend-lyart.vercel.app/api/user/createuser", {
            method: "POST", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password:credentials.password}), 
          });
          const json = await response.json(); 
          if (json.success===true) {
              localStorage.setItem('token',json.authtoken)
              props.showAlert("Account Created Successfully", "success")           
              navigate("/")
          }
          else{
            props.showAlert("Wrong Details", "danger")
          }

    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div className='container my-4'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" value={credentials.name} id="name" name='name' onChange={onChange} required aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} required aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
