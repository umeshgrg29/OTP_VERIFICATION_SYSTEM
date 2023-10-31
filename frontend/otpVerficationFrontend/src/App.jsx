
import React, { useState } from 'react';
import axios from 'axios';
import Register from './components/register';

const App = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleSendOTP = async () => {
    // API request to send OTP
    axios.post(`/api/sendotp`, {email})
    .then((res)=> {
      alert(res.data.message)
    })
    .catch((err)=> {
      alert("some error occured while sending otp")
    })
  };

  const handleValidateOTP = async () => {
    // API request to validate OTP
    const response = await axios.post('/api/validate-otp', { email, otp });
    if (response.data.success) {
      setToken(response.data.token);
      console.log(token)
      alert('OTP validated successfully');
    } else {
      alert(response.data.message);
    }
  };

  const handleGetUserProfile = async () => {
    // API request to get user profile
    const response = await axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}`},
    });
    console.log('User Profile:', response.data.data);
  };

  return (
    <div>
      <h1>Register</h1>
      <Register />
      <h1>Login</h1>
      <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={handleSendOTP}>Send OTP</button>
      <br />
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleValidateOTP}>Validate OTP</button>
      <button onClick={handleGetUserProfile}>Get User Profile</button>
    </div>
  );
};

export default App;

