import React, { useState, useEffect } from "react"
import { dbService } from "fbase"
import Zweet from "components/Zweet"

const Home = ({ userObj }) => {
  const [zweet, setZweet] = useState("")
  const [zweets, setZweets] = useState([])
  // const getZweets = async () => {
  //   const dbZweets = await dbService.collection("zweets").get()
  //   dbZweets.forEach((document) => {
  //     const zweetObject = {
  //       ...document.data,
  //       id: document.id,
  //       creatorId: 1212,
  //     }
  //     setZweets((prev) => [zweetObject, ...prev]) //이거 굉장히 중요ㅜ
  //   })
  // }

  useEffect(() => {
    // getZweets()
    dbService.collection("zweets").onSnapshot((snapshot) => {
      const zweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setZweets(zweetArray)
    })
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.collection("zweets").add({
      text: zweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
    setZweet("")
  }
  const onZweet = (event) => {
    setZweet(event.target.value)
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="zwitter"
          onChange={onZweet}
          value={zweet}
          placeholder="하고싶은 말 해봐"
          maxLength="120"
        ></input>
        <input type="submit" value="Zwitter"></input>
      </form>
      <div>
        {zweets.map((zweet) => (
          <Zweet key={zweet.id} zweetObj={zweet} isOwner={zweet.creatorId === userObj.uid}></Zweet>
        ))}
      </div>
    </>
  )
}
export default Home
