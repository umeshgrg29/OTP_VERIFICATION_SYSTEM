
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://super-duper-meme-954gr4vgjv5cp5gr-3000.app.github.dev';

const App = () => {
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');

  const handleSendOTP = async () => {
    // API request to send OTP
    const response = await axios.post(`https://super-duper-meme-954gr4vgjv5cp5gr-3000.app.github.dev/send-otp`);
    console.log(response.data);
  };

  // const handleValidateOTP = async () => {
  //   // API request to validate OTP
  //   const response = await axios.post('/api/validate-otp', { otp });
  //   if (response.data.success) {
  //     setToken(response.data.token);
  //     console.log('OTP validated successfully. Token:', response.data.token);
  //   } else {
  //     console.log(response.data.message);
  //   }
  // };

  // const handleGetUserProfile = async () => {
  //   // API request to get user profile
  //   const response = await axios.get('/api/profile', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   console.log('User Profile:', response.data);
  // };

  return (
    <div>
      <button onClick={handleSendOTP}>Send OTP</button>
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      {/* <button onClick={handleValidateOTP}>Validate OTP</button>
      <button onClick={handleGetUserProfile}>Get User Profile</button> */}
    </div>
  );
};

export default App;

