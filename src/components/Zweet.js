import React, { useState } from "react"
import { dbService } from "fbase"
const Zweet = ({ zweetObj, isOwner }) => {
  const [editZweet, setEditZweet] = useState(false)
  const [newZweet, setNewZweet] = useState(zweetObj.text)
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this Zweet?")
    if (ok) {
      await dbService.doc(`zweets/${zweetObj.id}`).delete() //주소 입력하는 방법 중요
    }
  }
  const toggleEditing = () => setEditZweet((prev) => !prev)
  const onSubmit = (event) => {
    event.preventDefault()
    dbService.doc(`zweets/${zweetObj.id}`).update({
      text: newZweet,
    })
    setEditZweet(false)
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewZweet(value)
  }

  return (
    <div>
      {editZweet ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Edit your zweet"
              value={newZweet}
              required
            />
            <input type="submit" value="Update Zweet"></input>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{newZweet}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Zweet</button>
              <button onClick={toggleEditing}>Edit Zweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Zweet
