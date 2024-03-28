import React, { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faRightFromBracket, faGear, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../pages/Main'


export default function Header() {

  // const [isMoreOption, setIsMoreOption] = useState({
  //   info: false,
  //   settings: false,
  //   more:false
  // });

  const useAuthContext = useContext(AuthContext)

    return (
      <div className="header">
        <div className="chat--title">
            {useAuthContext.userDet.username}
        </div>
        <div className="chat--options">
            <div className="chat-option">
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
            </div>
            <div className="chat-option">
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </div>
            <div className="chat-option">
              <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
            </div>
            <div className="chat-option logout-div" onClick={() => useAuthContext.setIsAuthenticated(false)}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
        </div>
      </div>
    )
  }