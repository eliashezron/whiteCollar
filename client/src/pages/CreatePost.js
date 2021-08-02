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
import Parser from 'html-react-parser'

function CreatePost({history}) {
  const quillObj = useRef(null)
  const [title, settitle] = useState('')
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
    if(quillObj && quillObj.current) {
      quillObj.current.getEditor()
     
    }
  
  }, [quillObj])
  const modules = useMemo(()=>({
    toolbar:{ 
      container:[
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
      [{font:[]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      [{ 'script': 'sub'}, { 'script': 'super' }], 
      ['clean']
    ], 

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
    }
    }
  }),[])
  const dispatch = useDispatch()
  useEffect(()=>{
    if(success){
      dispatch({type:POST_CREATE_RESET})
      history.push(`/post/${post._id}`)
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
      // console.log(data)
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
//   function imageHandler() {
//     var range = this.quill.getSelection();
//     var value = prompt('please copy paste the image url here.');
//     if(value){
//         this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
//     }
// }
  // let quillObj
  // function imageHandler(){
  //   const input = document.createElement('input');  
  //   input.setAttribute('type', 'file');  
  //   input.setAttribute('accept', 'image/*');  
  //   input.click(); 
  //   input.onchange = async()=>{
  //   const file = input.files[0]
  //   // previewFile(file)
  //   const formData = new FormData()
  //   formData.append('image', file)
  //   // setuploading(true)
  //   try{
  //     const config ={
  //       headers:{
  //         'Content-Type':'multipart/form-data'
  //       }
  //     }
  //     const res = await axios.post('/api/upload', formData, config)
  //     .then((response) => {
  //       if (response.data.error == 'false' || response.data.error == false) {
  //     quillObj.focus();
  //     const range = quillObj.getSelection(true);
  //     let position = range ? range.index : 0;
  //     quillObj.setSelection(position + 1);
  //     quillObj.insertEmbed(position, 'image', response.data)}})
  //   }catch(error){
  //     console.log(error)
  //     // setuploading(false)
  //   }
  // }}
  // const previewFile = (file) =>{
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onloadend=()=>{
  //     setpreviewsource(reader.result)
  //   }
  // }
  const gethtmlHandler=()=>{
    const editor = quillObj.current.getEditor();
    const unprivilegedEditor = quillObj.current.makeUnprivilegedEditor(editor);
    const inputText = unprivilegedEditor.getText()
    console.log(inputText)
    setdescription(inputText)
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
        {/* {Parser( */}
        <div className="writeFormGroup">
        <ReactQuill
        ref={quillObj} 
        placeholder='create your post'
            theme="snow" 
            defaultValue= {description}
            onChange={gethtmlHandler}
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


  export default CreatePost
