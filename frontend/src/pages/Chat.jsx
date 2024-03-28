import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatList from "../components/ChatList";
import Header from '../components/Header';
import '../css/Chat.css'


function Chat() {
  // let count = 0;
  const [formData, setformdata] = React.useState('')
  const [chat, setChats] = React.useState([])
  
  function handleSubmit(event) {
    event.preventDefault();
    // console.log('submitted => ',formData);
    // <Message msg={formData} id={++count}/>
    setChats(prevChats => (
      [...prevChats, {
        id: prevChats.length + 1,
        msg: formData
      }]
    ))
  }
  console.log(chat);

  function handleChange(event) {
    setformdata(prevformData => {
      // console.log(event.target.value);
      return event.target.value;
    })
  }

  let chats = chat.map(msg => {
    // console.log('chats',chat);
    return (
      <div className="my-msg-div msg-div" key={msg.id}>
            <div className="my-msg msg">
              {msg.msg}
            </div>
          </div> 
    )
  }) 

  return (
    <div className="main-div">
      <ChatList />
      <div className='chat-page'>
        <Header />
        <div className="container">
          <div className="message">
              <div className="message-div">
                {chats && [chats]}
              </div>
          </div>
          <form className="input-box" onSubmit={handleSubmit}>
            <div className="input-dp-div">
              <img className='input-dp' src="https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png" alt="dp" />
            </div>
            <input className='input-msg' onChange={handleChange} type="text" name='message' placeholder='Write a message ...' />
            <button className='send-msg'><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat