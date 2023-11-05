import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


export default function Login(props) {
    const [credentials, setCredentials]=useState({email:"",password:""})
    const navigate=useNavigate()
    // console.log(credentials.email)
    const handleSubmit=async(e)=>{
        // const host="http://localhost:5000"
        e.preventDefault()
        const response=await fetch(`http://localhost:5000/api/auth/login/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json=await response.json()
        console.log(json)
        if(json.success){
            console.log(json.authToken)
            localStorage.setItem("auth-token",json.authToken);
            props.showAlert("Account login Successfully ",'success')
            navigate("/home");
        }else{
            props.showAlert("incalid credentials ",'danger')
            
        }
    }


    const onChange=(e)=>{
        // e.preventDefault()
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }


  return (
    <div>
       <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' value={credentials.email} className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password}id="password" onChange={onChange} name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}
