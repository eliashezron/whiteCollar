import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const Hooks =({userAuthor})=>{
 const [user, setuser] = useState()
  useEffect(() => {
    async function fetchUser(){
      const {data} = await axios.get(`/api/users?userName=${userAuthor}`)
      setuser(data)
    }
    fetchUser()
      
    }, [userAuthor])
    return{user}
  }
