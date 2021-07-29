// import axios from 'axios'
// import React,{useEffect,useState} from 'react'
// import Pusher from 'pusher-js'
// /**
// * initialize pusher with your credentials.
// * Get 'key' from pusher dashboard
// */
// const pusher = new Pusher('a09580bb76b0d8c97e6c',{
//     cluster: 'mt1',
//     encrypted: true
// })
// // subscribe your pusher instance to the channel 'sport-buzz-news'
// const channel =  pusher.subscribe('whitepen')
// /* global fetch */



// function CommentsPage() {
//     const [comments, setcomments] = useState([''])
//     const [message, setmessage] = useState('')
//     const [author, setauthor] = useState('')

//      useEffect(async() => {
//          const {data} = await axios('/api/comments') 
//          console.log(data)
//          setcomments([...data, ...comments])
//          recieveUpdateFromPusher()
//          return () => {
//              pusher.unsubscribe('whitepen')
//          }
//      }, [comments])
//     //  add new comments to the top of the list once there is update
//      const recieveUpdateFromPusher=()=>{
//         channel.bind('new-comment', comment =>{
//             setcomments(comment, ...comments)
//         })
//         console.log('app subscription to event successful')
//      }
 

//     // post comments to the server
//     const postComment = async(author, message)=>{
//         await fetch('/api/comment',{
//             body:JSON.stringify({author, message}),
//             method:'POST',
//             headers:{
//                 'user-agent':'Mozzila/4.0',
//                 'Content-Type':'application/json'
//             }
//         })
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         postComment({author, message})
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//           <label>
//           Name:
//             <input type='text' value={author} onChange={(e)=>setauthor(e.target.value)} />
//           </label>
//           <label>
//             <br />
//           Message:
//             <textarea type='text' value={message} onChange={(e)=>setmessage(e.target.value)} />
//           </label>
//           <br />
//           <input type='submit' value='Submit' />
//         </form>
//         <CommentList comments={comments} />
//         </div>
//     )
// }


// const CommentList= ({comments}) => {
//     return (
//       <section>
//         <strong>Comments: </strong>
//       {comments.map((comment, i) => (
//             <div key={i} style={{
//         padding: '5px',
//         border: '1px solid grey'
//       }}>
//         <p><strong>{comment.author}:</strong></p>
//         <p>{comment.message}</p>
//       </div>))}
//       </section>
//     )
//   }
// export default CommentsPage
