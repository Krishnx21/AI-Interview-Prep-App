import React from 'react';
import { PlayCircle, Clock, Plus, Target, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="greeting">Welcome back, Krishna 👋</h1>
          <p className="subtitle">Ready to ace your next system design interview?</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/interview')}>
          <Plus size={18} /> New Interview
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon glow-blue"><Target size={24} color="white" /></div>
          <div className="metric-info">
            <span className="metric-label">Average Score</span>
            <span className="metric-value">86<small>/100</small></span>
          </div>
          <div className="metric-trend positive"><TrendingUp size={16} /> +4% this week</div>
        </div>
        
        <div className="metric-card glass-panel">
          <div className="metric-icon glow-purple"><Clock size={24} color="white" /></div>
          <div className="metric-info">
            <span className="metric-label">Practice Time</span>
            <span className="metric-value">12<small>h</small> 30<small>m</small></span>
          </div>
          <div className="metric-trend neutral">- 2h than last week</div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon glow-pink"><CheckCircle size={24} color="white" /></div>
          <div className="metric-info">
            <span className="metric-label">Interviews Completed</span>
            <span className="metric-value">14</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section main-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="action-cards">
            <div className="action-card glass-card" onClick={() => navigate('/interview')}>
              <div className="card-bg-glow glow-blue"></div>
              <h4>Mock Interview</h4>
              <p>Practice with AI behavioral & technical rounds</p>
              <div className="card-footer text-gradient">Start Session <PlayCircle size={16} /></div>
            </div>
            
            <div className="action-card glass-card" onClick={() => navigate('/resume')}>
              <div className="card-bg-glow glow-purple"></div>
              <h4>Resume Analyzer</h4>
              <p>Get AI feedback on your latest resume</p>
              <div className="card-footer text-gradient">Upload PDF <PlayCircle size={16} /></div>
            </div>
          </div>

          <div className="section-header mt-8">
            <h3>Recent Activity</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="activity-list glass-panel">
            <div className="activity-item">
              <div className="activity-icon bg-blue"><Bot size={18} /></div>
              <div className="activity-content">
                <h5>Product Design Interview (Google)</h5>
                <p>Score: 92/100 • Feedback: Excellent communication</p>
              </div>
              <div className="activity-time">2 hours ago</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon bg-purple"><FileText size={18} /></div>
              <div className="activity-content">
                <h5>Resume Uploaded</h5>
                <p>ATS Score improved from 65 to 88</p>
              </div>
              <div className="activity-time">Yesterday</div>
            </div>
          </div>
        </div>

        <div className="section side-section">
          <div className="glass-panel progress-widget">
            <h3>Next Milestone</h3>
            <div className="circular-progress">
               {/* CSS pure circle progress */}
               <div className="circle">
                 <div className="inner">85%</div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                  <defs>
                     <linearGradient id="GradientColor">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                     </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="70" strokeLinecap="round" />
               </svg>
            </div>
            <h4>Senior PM Prep</h4>
            <p>Complete 2 more behavioral interviews to reach your goal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick fix for missing lucide imports in this file
import { Bot, FileText } from 'lucide-react';

export default Dashboard;
