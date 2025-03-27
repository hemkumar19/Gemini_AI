import React, { useContext, useState } from 'react';
import '../Sidebar/sidebar.css';
import menu from '../../assets/menu.png';
import plus from '../../assets/plus.png';
import message from '../../assets/message.png';
import question from '../../assets/question.png';
import history from '../../assets/history.png';
import setting from '../../assets/setting.png';
import { ConText } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(ConText);

  // Function to load a previous prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);   // Set the selected prompt as the recent one
    await onSent(prompt);      // Send the selected prompt
  };

  return (
    <div className='sidebar'>
      <div className='top'>
        {/* Menu button to toggle extended view */}
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='menu' 
          src={menu} 
          alt='menu' 
        />

        {/* New Chat button */}
        <div onClick={newChat} className="new-chat">
          <img className='plus' src={plus} alt='plus' />
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* Display recent prompts if sidebar is extended */}
        {extended ? (
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.map((item, index) => (
              <div 
                key={index}  // Use a key when mapping items
                onClick={() => loadPrompt(item)} 
                className="recent-entry"
              >
                <img src={message} alt="message" />
                <p>{item.slice(0, 18)} ...</p> {/* Show truncated prompt */}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        {/* Bottom section with Help, Activity, and Settings */}
        <div className="bottom-item recent-entry">
          <img src={question} alt="question" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={history} alt="history" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={setting} alt="setting" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
