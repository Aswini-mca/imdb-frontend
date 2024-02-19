import React from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import { API } from '../global'
import '../css/Login.css'

function Forgetpassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const[randomString,setRandomString] = useState("")

   //handlesubmit coding
   const handlesubmit = async () => {
    const payload = {
       email
    }
    const res = await fetch(`${API}/user/forget-password`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await res.json();
    console.log(data.randomString)
    if (data.error) {
      setError(data.error)
    }
    if (data.message) {
      setMessage(data.message);
      setError('');
    }
    if (data.resetToken) {
      setRandomString(data.resetToken)
    }
  }
  return (
    <div className='container m-5 p-4'>
    <div className='container-login'>
      <h3>Password assitance</h3>
      <p>Enter the email address associated with your IMDb account.</p>
      <label htmlFor="email" className="form-label">E-mail</label>
        <input type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-warning mt-3" onClick={handlesubmit}>Continue</button>
      {error ? <p className='text-danger m-4'>{error}❗️</p> : ""}
      {message ? <p className='text-success m-4 text-center'>✅{message}</p> : ""}
      {message ?  <Link style={{ color: "black",fontSize:"1em" }} className='nav text-primary' aria-current="page" to={`/reset-password/${randomString}`}>Reset Password Link</Link> : ""}
    </div>
    </div>
  )
}

export default Forgetpassword