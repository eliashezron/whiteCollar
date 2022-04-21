import axios from 'axios'
import React,{useState,useMemo, useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PaperClipOutlined,DoubleLeftOutlined} from '@ant-design/icons'
import { createPostCreate } from '../actions/postActions'
import { POST_CREATE_RESET } from '../constants/postConstants'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import {message} from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {db, storage} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

function CreatePost({history}) {
  const quillObj = useRef(null)
  const [title, settitle] = useState('')
  const [progress, setProgress] = useState('')
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')
  const [category, setcategory] = useState('')
  const [previewsource, setpreviewsource] = useState('')
  const [uploading, setuploading] = useState(false)
  const categoriesPost = useSelector(state => state.categoriesPost)
  const {categoriesInfo, isLoading} = categoriesPost
  const createPost = useSelector(state => state.createPost)
  const {success, post, error} = createPost
  useEffect(() => {
    let isMounted = true
    if(isMounted && (quillObj && quillObj.current)) {
      quillObj.current.getEditor()
    }
    return()=>{isMounted= false}
  }, [quillObj])
  const dispatch = useDispatch()
  useEffect(()=>{
    if(success){
      dispatch({type:POST_CREATE_RESET})
      history.push(`/post/${post._id}`)
    }   
  },[dispatch, history, success , post])
  const modules = useMemo(()=>({
    toolbar:{ 
      container:[
      [{ 'size': ['large','small', 'huge', false] }],
      [{font:[]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
      [{ 'align': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      [{ 'script': 'sub'}, { 'script': 'super' }], 
      ['clean']
    ], 
    }
  }),[])
 

  const uploadFileHandler =async(e)=>{
    const file = e.target.files[0]
    previewFile(file)
    const formData = new FormData()
    formData.append('image', file)
    setuploading(true)
    
    const fileRef = storage.ref(file.name)
    fileRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      console.log(err);
    }, async () => {
      const url = await fileRef.getDownloadURL();
      // const createdAt = timestamp();
      // await collectionRef.add({ url, createdAt });
      setimage(url);
    }); 

  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setpreviewsource(reader.result)
    }
  }

  const gethtmlHandler=(e)=>{
    const editor = quillObj.current.getEditor();
    const unprivilegedEditor = quillObj.current.makeUnprivilegedEditor(editor);
    const inputText = unprivilegedEditor.getText()
    setdescription(inputText)
  }
  
  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(!image){
      message.warning('add an image before posting')
    }else if(!title){
      message.warning('add a title before posting')

    }else if(!description){
      message.warning('add a description before posting')
    }else{
      const postRef = collection(db, 'posts')
      await addDoc(postRef,
      ({image, title, description, category, author: 'elias'}))
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
      custom="true"
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
        {/* {Parser( */}
        <div className="writeFormGroup">
      
        <ReactQuill
        ref={quillObj} 
        placeholder='create your post'
            theme="snow" 
            defaultValue= {description}
            onChange={(e)=>gethtmlHandler()}
            modules={modules}
            formats={CreatePost.formats}
         />
          </div>
          {/* // )} */}
          {/* <textarea
            className="writeInput writeText"
            placeholder="description"
            type="text"
            autoFocus={true}
            onChange={(e)=>setdescription(e.target.value)}
          /> */}
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px', marginBottom:'20px'}}>
        <button className="writeSubmit" 
        type="submit"
        shape='round'
        >
          Publish
        </button>
        </div>
      </form>
    </div>)}
    </>
  )}
  CreatePost.formats = [
    'header',
    'font',
    'size',
    'align',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script',
    'link', 'image', 'formula','code-block',
  ]

}

export default React.memo(CreatePost)
