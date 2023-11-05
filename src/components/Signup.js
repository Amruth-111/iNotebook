import React ,{useState }from 'react'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const [credentials, setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const navigate=useNavigate()
    // console.log(credentials.email)
    const handleSubmit=async(e)=>{
        // const host="http://localhost:5000"
        const {name,email,password}=credentials
        e.preventDefault()
        const response=await fetch(`http://localhost:5000/api/auth/signup/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await response.json()

        if(json.success){
            localStorage.setItem("auth-token",json.authtoken);
            navigate("/");
        }else{
            alert(json.msg)
        }
    }

    const onChange=(e)=>{
        // e.preventDefault()
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <div>
       <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Enter Name</label>
                    <input type="name" name='name' value={credentials.name} className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" minLength={5}required/>
                </div>  
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' value={credentials.email} className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"minLength={5}required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password}id="password" onChange={onChange} name="password" placeholder="Password" minLength={5}required/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" onChange={onChange} name="cpassword" placeholder="confirm Password"minLength={5}required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
    </div>
  )
}
