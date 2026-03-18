import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Video, Settings, XCircle, PlayCircle, StopCircle, User } from 'lucide-react';
import './Interview.css';

const Interview = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Welcome to your mock interview for the Senior Frontend Engineer role. Let's start with a brief introduction. Can you walk me through your most recent project and your role in it?", time: '10:00 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const messagesEndRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg = { sender: 'user', text: inputValue, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    
    // Simulate AI typing and response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "That's an impressive scale. When handling that much traffic, what specific optimization techniques did you implement to ensure the React application remained performant?", 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      }]);
    }, 2000);
  };

  return (
    <div className="interview-page">
      <div className="interview-header glass-card">
        <div className="session-info">
          <h2>Senior Frontend Engineer - System Design</h2>
          <div className="session-meta">
             <span className="live-indicator"><span className="dot"></span> Live</span>
             <span className="timer"><ClockIcon /> {formatTime(timer)}</span>
          </div>
        </div>
        <div className="header-controls">
          <button className="icon-btn"><Video size={20} /></button>
          <button className="icon-btn"><Settings size={20} /></button>
          <button className="btn-danger"><XCircle size={18} /> End Session</button>
        </div>
      </div>

      <div className="interview-container">
        {/* Left Side: Video/AI Avatar */}
        <div className="video-pane glass-panel">
          <div className="main-video">
             <div className="ai-avatar-container">
               <div className="ai-rings">
                  <div className="ring r1"></div>
                  <div className="ring r2"></div>
                  <div className="ring r3"></div>
               </div>
               <div className="ai-core-avatar glow-blue">
                 <BotIcon size={64} color="white" />
               </div>
             </div>
             <div className="ai-status">AI Interviewer is listening...</div>
             <div className="realtime-feedback">
                <div className="feedback-item positive">Pacing: Good</div>
                <div className="feedback-item warning">Tone: Try to sound more confident</div>
             </div>
          </div>
          <div className="user-video-mini glass-card">
             <div className="camera-placeholder">
                <User size={32} color="var(--text-tertiary)" />
             </div>
          </div>
        </div>

        {/* Right Side: Transcript/Chat */}
        <div className="chat-pane glass-panel">
          <div className="chat-header">
            <h3>Transcript</h3>
            <span className="question-count">Question 1 of 5</span>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === 'ai' && <div className="msg-avatar ai"><BotIcon size={16} /></div>}
                <div className={`message-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
             <div className="input-wrapper glass-card">
               <input 
                 type="text" 
                 placeholder="Type your response or use voice input..." 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
               />
               <button 
                 className={`mic-btn ${isRecording ? 'recording' : ''}`}
                 onClick={() => setIsRecording(!isRecording)}
               >
                 {isRecording ? <StopCircle size={20} color="#ec4899" /> : <Mic size={20} color="var(--text-secondary)" />}
               </button>
               <button className="send-btn" onClick={handleSend}>
                 <Send size={20} />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SVG Icon helpers
const BotIcon = ({ size, color }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

export default Interview;
