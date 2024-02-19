import React, { useState } from 'react'
import { API } from '../global'
import '../css/Signup.css'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ReEnterpassword, setReEnterPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  //handlesignup coding
  const handlesignup = async () => {
    const payload = {
      userName,
      email,
      password,
      confirmPassword: ReEnterpassword
    }
    const res = await fetch(`${API}/user/signup`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await res.json();

    if (data.error) {
      setError(data.error)
    }
    if (data.message) {
      setMessage(data.message);
      setError('');
      navigate('/login')
    }
  }

  return (
    <div className='container m-5 p-4'>
      <div className='container-signup'>
      <h3>Create account</h3>
        <label htmlFor="username" className="form-label">Your Name</label>
        <input type="text"
          className="form-control"
          id="username"
          placeholder="First and last name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="email" className="form-label">E-mail</label>
        <input type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="col-form-label">Password</label>
        <input type="password"
          className="form-control"
          id="password"
          placeholder="at least 8 characters"
          value={password}
          title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="repassword" className="col-form-label">Re-Enter Password</label>
        <input type="password"
          className="form-control"
          id="repassword"
          value={ReEnterpassword}
          title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
          onChange={(e) => setReEnterPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-warning mt-3" onClick={handlesignup}>Create your IMDb account</button>
        <p className='mt-3'>Already have an account? <Link to={'/login'}>Sign In</Link></p>
        {error ? <p className='text-danger m-4'>{error}❗️</p> : ""}
        <div className='text-center'>{message ? <p className='text-success m-4'>{message} ✅ click Sign In!</p> : ""}</div>
      </div>
    </div>
  )
}

export default Signup