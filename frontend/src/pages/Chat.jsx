import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatList from "../components/ChatList";
import Header from '../components/Header';
import './Chat.css'


function Chat(props) {
  // let count = 0;
  const [formData, setformdata] = React.useState('')
  const [chat, setChats] = React.useState([])

  
  function handleChange(event) {
    setformdata(prevformData => {
      console.log(event.target.value);
      return event.target.value;
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submitted => ',formData);
    // <Message msg={formData} id={++count}/>
    setChats(prevChats => (
      [...prevChats,formData]
    ))
  }
  let chats = chat.map(msg => {
    console.log('chats',chat);
    return (
      <div className="my-msg-div msg-div">
            <div className="my-msg msg">
              {msg}
            </div>
          </div> 
    )
  }) 

  return (
    <div className="main-div">
      <ChatList />
      <div className='chat-page'>
        <Header handleLogout={props.handleLogout} name={props.name } />
        <div className="container">
          <div className="message">
              <div className="message-div">
                {chats && [chats]}
              </div>
          </div>
          <form className="input-box" onSubmit={handleSubmit}>
            <div className="input-dp-div">
              <img className='input-dp' src="https://vectorified.com/images/persona-icon-6.jpg" alt="dp" />
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