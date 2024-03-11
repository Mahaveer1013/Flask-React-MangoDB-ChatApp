import React from "react";
import users from '../assets/chat-users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Chat from "../pages/Chat";

// console.log(users.Fav);
let FavUsers = users.Fav;
let DmUsers = users.Dm;
let ChannelUsers = users.Channel;

function ChatList() {

  const [dropDowns, setDropDowns] = React.useState({
    Fav: false,
    Dm: false,
    Channel:false
  })
  // console.log(dropDowns);

  function ShowDropdown(name) {
    setDropDowns(preDropdowns => ({
      ...preDropdowns,
      [name]:!dropDowns[name]
    }))
  }

  function openPage(event) {
    console.log(event);
    const { name, key, type } = event.target.dataset;
    console.log('name',name);
    console.log('key',key);
    console.log('type',type);
    <Chat name={name} id={key} type={type } />
  }
  
  const Fav = FavUsers.map((fav) => {
    return (
                  <li className="cl-favs cl-li" key={fav.id} onClick={openPage} data-type='Fav' data-name={fav.name}>
                    <div className="cl--dp-div">
                      <img alt="dp" className='cl--dp fcc' src={fav.img}></img>
                    </div> 
                    <p className="cl--username">{fav.name}</p>
                  </li>
    )
  })
  const Dm = DmUsers.map((dm) => {
    return (
                  <li className="cl-dm cl-li" key={dm.id} onClick={openPage} data-type='Dm' data-name={dm.name}>
                    <div className="cl--dp-div">
                      <img alt="dp" className='cl--dp' src={dm.img}></img>
                    </div> 
                    <p className="cl--username">{dm.name}</p>
                  </li>
    )
  })
  const Channel = ChannelUsers.map((channel) => {
    return (
                  <li className="cl-channel cl-li" key={channel.id} onClick={openPage} data-type='Channel' data-name={channel.name}>
                    <div className="cl--dp-div">
                      <img alt="dp" className='cl--dp' src={channel.img}></img>
                    </div> 
                    <p className="cl--username">{channel.name}</p>
                  </li>
    )
  })

  return (
    <div className="chat-list-main">
      <div className="cl--title white">Chat Room</div>
      <div className="chat-list">
        <div className="cl--fav" onClick={()=>ShowDropdown('Fav')}>
          <div className="cl--fav-title"><FontAwesomeIcon className={`drop-down-icon ${dropDowns.Fav? '':'close'}`} icon={faCaretDown} /> <p className="cl--list-title">FAVOURITES</p></div>
                <ul className={`cl--fav-list ${dropDowns.Fav? 'cl-ul':''}`}>
                  {Fav}
                </ul>
        </div>
        <div className="cl--dm" onClick={()=>ShowDropdown('Dm')}>
          <div className="cl--dm-title"><FontAwesomeIcon className={`drop-down-icon ${dropDowns.Dm? '':'close'}`} icon={faCaretDown} /> <p className="cl--list-title">DIRECT MESSAGES</p></div>
            <ul className={`cl--dm-list ${dropDowns.Dm? 'cl-ul':''}`}>
              {Dm}
            </ul>
        </div>
        <div className="cl--channel" onClick={()=>ShowDropdown('Channel')}>
          <div className="cl--channel-title"><FontAwesomeIcon className={`drop-down-icon ${dropDowns.Channel? '':'close'}`} icon={faCaretDown} /> <p className="cl--list-title">CHANNELS</p></div>
            <ul className={`cl--channel-list ${dropDowns.Channel? 'cl-ul':''}`}>
              {Channel}
            </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
