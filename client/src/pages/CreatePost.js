import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PaperClipOutlined,DoubleLeftOutlined} from '@ant-design/icons'
import { createPostCreate } from '../actions/postActions'
import { POST_CREATE_RESET } from '../constants/postConstants'
import { getAllCategories } from '../actions/categoriesAction'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { message , Button} from 'antd'

export default function CreatePost({match, history}) {
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')
  const [category, setcategory] = useState('')
  const [previewsource, setpreviewsource] = useState('')
  const [uploading, setuploading] = useState(false)
  const loginUser = useSelector(state => state.loginUser)
  const {userInfo} = loginUser
  const categoriesPost = useSelector(state => state.categoriesPost)
  const {categoriesInfo, isLoading} = categoriesPost
  const createPost = useSelector(state => state.createPost)
  const {success, post, error} = createPost

  const dispatch = useDispatch()
  useEffect(()=>{
    if(success){
      dispatch({type:POST_CREATE_RESET})
      history.push(`/post/${post._id}`)
    }else{
      console.log('failed to create post')
    }
        
  },[dispatch, history, success , post])

  const uploadFileHandler =async(e)=>{
    const file = e.target.files[0]
    previewFile(file)
    const formData = new FormData()
    formData.append('image', file)
    setuploading(true)
    try{
      const config ={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/upload', formData, config)
      console.log(data)
      setimage(data)
      setuploading(false)
    }catch(error){
      console.log(error)
      setuploading(false)
    }
  }
  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setpreviewsource(reader.result)
    }
  }
  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!image){
      message.warning('add an image before posting')
    }else if(!title){
      message.warning('add a title before posting')

    }else if(!description){
      message.warning('add a description before posting')
    }else{
      
      dispatch(createPostCreate({image, title, description, category}))
    }

    
  }
  return (
    <>
    <Meta title='Create Post'/>
    <Link to='/'><DoubleLeftOutlined /></Link>
    {isLoading ? <Loader/> : error ? <h3>{error}</h3> : (
    <div className="write">
      {uploading ? (<h1><Loader/></h1>) : 
      previewsource  ? (
        <img
        className="writeImg"
        src={previewsource}
        alt=""
      />
      ):(<div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'120px', width:'100%', border:'1px solid gray'}}>
        <label htmlFor="fileInput">
        <i className="writeIcon">
        <PaperClipOutlined /></i>
      </label>
      <input id="fileInput" 
      type="file" 
      placeholder="click to add Image"
      style={{ display: "none" }}
      custom
      onChange={uploadFileHandler} />
      </div>
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">

          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>settitle(e.target.value)}
          />
        </div>
        <div className='categories-section'>
          <label >select a category</label>
         {categoriesInfo ? 
         <select className='dropbtn' value ={category} onChange={(e)=>setcategory(e.target.value)}>
            {categoriesInfo.map((x)=>{
             return  (<option key={x._id}className='dropdown-content' >{x.category} </option>)} )} 
          </select> :''} 
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="description"
            type="text"
            autoFocus={true}
            onChange={(e)=>setdescription(e.target.value)}
          />
        </div>
        <Button className="writeSubmit" 
        type="submit"
        shape='round'
        >
          Publish
        </Button>
      </form>
    </div>)}
    </>
  );
}
