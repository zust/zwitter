import React, { useState } from "react"
import { authService, firebaseInstance } from "fbase"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("")
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    // const {name,value}=event.target
    console.log(value)
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    let data
    try {
      if (newAccount) {
        //create new account
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        //Log in
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (error) {
      setError(error.message)
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev)
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event
    let provider
    console.log(name)
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
      console.log(firebaseInstance)
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }
    const data = await authService.signInWithPopup(provider)
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Passworld"
          required
          value={password}
          onChange={onChange}
        ></input>
        <input type="submit" value="login" value={newAccount ? "Create Account" : "Log in"}></input>
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create ID"}</span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  )
}
export default Auth
