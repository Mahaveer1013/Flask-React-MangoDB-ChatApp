import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCircleInfo, faGear, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


export default function Header(props) {

  function handleMoreOption() {
      
    }
  console.log(props);

    return (
      <div className="header">
        {/* <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> */}
        <div className="chat--title">
            {props.name}
        </div>
        <div className="chat--options">
            <div className="chat-option">
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
            </div>
            <div className="chat-option">
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </div>
            <div className="chat-option logout-div" onMouseOver={handleMoreOption}>
              <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
            </div>
          <button
            className="logout-btn"
            onClick={()=>props.handleLogout() }
          >Logout</button>
        </div>
      </div>
    )
  }