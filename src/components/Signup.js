import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate = useNavigate();
    const [creds, setCreds] = useState({name: "", email: "", password: "", cpassword: ""})
    const {name, email, password, cpassword} = creds;
    const handleSubmit = async(e) =>{
        if(password===cpassword){
            e.preventDefault()
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify({name, email, password})
              });
              const json = await response.json()
              console.log(json);
              if(json.success){
                //Save the auth token and redirect
                localStorage.setItem('token', json.authToken);
                navigate("/");
                props.showAlert("Account created successfully", "success")
    
              }
              else{
                props.showAlert("Invalid Credentials", "danger")
              }
        }
        else{
            props.showAlert("Password and cpassword should be same", "danger")
        }
    }

    const onChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" onChange={onChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email"  className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} className="form-control" id="password" name="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" onChange={onChange} className="form-control" id="cpassword" name="cpassword" minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup