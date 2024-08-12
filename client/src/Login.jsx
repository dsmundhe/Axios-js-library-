import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      if (response.data.success) {
        setMsg("Login successful");
      } else {
        setMsg("Error: Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMsg("Error: Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>

        {msg}
      </form>
    </div>
  );
}

export default Login;
