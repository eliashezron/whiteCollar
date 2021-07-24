import React,{ useState,useEffect} from "react"
import axios from 'axios'


export const Hooks =({userAuthor})=>{
    const [user, setuser] = useState('')
  useEffect(async() => {
    const {data} = await axios.get(`/api/users?userName=${userAuthor}`)
    setuser(data)
  }, [])
    return {user}
}

