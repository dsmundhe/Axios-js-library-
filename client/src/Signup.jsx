import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setloader] = useState(null);
  const [val, setval] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setval("");
    try {
      const response = await axios.post("http://localhost:3000/register", {
        name: name,
        email: email,
        password: password,
      });
      setTimeout(() => {
        setval();
      }, 1000);
      if (response.data.success) {
        await setSuccessMessage("Signup successful!");
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setloader(null);
      } else {
        setError(response.data.msg);
        setSuccessMessage("user already present");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please check the server and try again.");
      setSuccessMessage("user allready present..........");
      setval();
    }
  };

  return (
    <div>
      {val === "" ? (
        <>
          <div>
            <Loader />
            <h1>Loign successful</h1>
          </div>
        </>
      ) : (
        <>
          <div className="signup-container">
            <h1>Signup</h1>
            <h1>{loader}</h1>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                <button type="submit" className="signup-button">
                  Signup
                </button>
              </div>
              <h3>{successMessage}</h3>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
