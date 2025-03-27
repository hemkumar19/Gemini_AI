import React, { useContext } from 'react';
import './../BodySection/BodySection.css';
import img from '../../assets/Hem.jpg';
import compass from '../../assets/compass.png';
import blub from '../../assets/blub.png';
import message from '../../assets/message.png';
import code from '../../assets/code.png';
import gallary from '../../assets/gallary.png';
import mic from '../../assets/mic.png';
import send from '../../assets/send.png';
import { ConText } from '../../context/Context';
import gemini from '../../assets/gemini.png';

const BodySection = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(ConText);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img className="img" src={img} alt="Profile" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Hemkumar</span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={compass} alt="Compass" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={blub} alt="Light bulb" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={message} alt="Message" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={code} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={img} alt="Profile" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={gemini} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={gallary} alt="Gallery" />
              <img src={mic} alt="Mic" />
              {input?<img onClick={() => onSent(input)} src={send} alt="Send" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini
            AppsOpens in a
          </p>
        </div>
      </div>
    </div>
  );
};

export default BodySection;