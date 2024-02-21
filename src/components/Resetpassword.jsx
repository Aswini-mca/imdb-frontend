import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../global'
import '../css/Login.css'

function Resetpassword() {
  const { resetToken } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  //handlesubmit coding
  const handlesubmit = async () => {
    const payload = {
      newPassword: password,
      confirmPassword: confirmPassword
    }
    const res = await fetch(`${API}/user/reset-password/${resetToken}`, {
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
      <div className='container-login mx-auto'>
        <h3>Reset Account Password</h3>
        <label htmlFor="password" className="col-form-label">Password</label>
        <input type="password"
          className="form-control"
          id="password"
          placeholder="Enter your new password"
          value={password}
          title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword" className="col-form-label">Re-enter Password</label>
        <input type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-warning mt-3" onClick={handlesubmit}>Reset Password</button>
        {error ? <p className='text-danger m-4'>{error}❗️</p> : ""}
        {message ? <p className='text-success m-4 text-center'>{message}✅,click sign In!</p> : ""}
      </div>
    </div>
  )
}

export default Resetpassword