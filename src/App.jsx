import { useState } from 'react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  const [token, setToken] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleChangeLogin = (e) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }
    
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    })

    setFormData({
      username: "",
      password: ""
    })
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(data => {
        setToken(data.token)
        localStorage.setItem("jwt", token)
        setLoginData({
          username: "",
          password: ""
        })
      })
      .catch(error => {
        alert(error.message)
      })
  }

  return (
    <>
      <div className="App">
        <h2>Create your account</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      <div className="middle-div"></div>

      <div className="Account">
        <h2>Welcome back!</h2>

          <form onSubmit={handleSubmitLogin}>
            <div>
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                name="username"
                value={loginData.username}
                onChange={handleChangeLogin}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password"
                value={loginData.password}
                onChange={handleChangeLogin}
              />
            </div>

            <button type="submit">Log in</button>
          </form>
      </div>
    </>
  );
}
