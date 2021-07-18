import React from "react"
import { authService } from "fbase"
import { useHistory } from "react-router-dom"

export default () => {
  const history = useHistory()
  const onLogOut = () => {
    authService.signOut()
    history.push("/")
  }
  return <button onClick={onLogOut}>Log out</button>
}
