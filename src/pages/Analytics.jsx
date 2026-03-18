import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, Zap, Activity } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Performance Analytics</h1>
        <p className="subtitle">Track your interview success rate and identify growth areas.</p>
      </div>

      <div className="analytics-grid">
        {/* Main Chart Area */}
        <div className="main-chart glass-panel">
          <div className="chart-header">
             <div>
               <h3>Interview Scores Over Time</h3>
               <p className="text-secondary">Last 30 days performance</p>
             </div>
             <div className="chart-legend">
               <span className="legend-item"><span className="dot blue"></span> Technical</span>
               <span className="legend-item"><span className="dot purple"></span> Behavioral</span>
             </div>
          </div>
          
          <div className="chart-wrapper">
             {/* CSS-based Bar Chart Representation */}
             <div className="css-bar-chart">
               {[65, 70, 68, 80, 75, 85, 90, 88].map((val, i) => (
                 <div key={i} className="chart-col">
                   <div className="bar blue" style={{ height: `${val}%`, animationDelay: `${i * 0.1}s` }}>
                     <span className="tooltip">{val}%</span>
                   </div>
                   <span className="x-label">W{i+1}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="side-stats-grid">
          <div className="stat-box glass-card glow-on-hover">
            <div className="stat-icon bg-pink"><Zap size={20} color="white" /></div>
            <div className="stat-details">
              <h4>Top Strength</h4>
              <p>System Architecture (94%)</p>
            </div>
          </div>
          <div className="stat-box glass-card glow-on-hover">
            <div className="stat-icon bg-orange"><AlertCircle size={20} color="white" /></div>
            <div className="stat-details">
              <h4>Needs Focus</h4>
              <p>Leadership Examples (62%)</p>
            </div>
          </div>
          <div className="stat-box glass-card glow-on-hover">
            <div className="stat-icon bg-green"><TrendingUp size={20} color="white" /></div>
            <div className="stat-details">
              <h4>Growth Metric</h4>
              <p>Communication pacing improved 15%</p>
            </div>
          </div>
          <div className="stat-box glass-card glow-on-hover">
            <div className="stat-icon bg-blue"><Activity size={20} color="white" /></div>
            <div className="stat-details">
              <h4>Consistency</h4>
              <p>Practiced 5 days this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart & Details */}
      <div className="details-grid">
         <div className="radar-section glass-panel">
            <h3>Skill Distribution</h3>
            <div className="radar-container">
               {/* Simplified SVG Radar interpretation */}
               <svg viewBox="0 0 100 100" className="radar-svg">
                  {/* Grid */}
                  <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  <polygon points="50,35 65,45 65,55 50,65 35,55 35,45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  {/* Axes */}
                  <line x1="50" y1="50" x2="50" y2="5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="95" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="95" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="5" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="5" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  
                  {/* Data Shape */}
                  <polygon points="50,15 85,30 75,60 50,85 25,70 15,35" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1" className="radar-path"/>
               </svg>
               <div className="radar-labels">
                  <span className="r-label top">System Design</span>
                  <span className="r-label top-right">Leadership</span>
                  <span className="r-label bottom-right">Problem Solving</span>
                  <span className="r-label bottom">Communication</span>
                  <span className="r-label bottom-left">Algorithms</span>
                  <span className="r-label top-left">Culture Fit</span>
               </div>
            </div>
         </div>

         <div className="insights-section glass-panel">
            <h3>AI Insights & Feedback</h3>
            <div className="insights-list">
              <div className="insight-card positive">
                 <h4>Strong Technical Depth</h4>
                 <p>You effectively weigh trade-offs when discussing microservices vs. monolith architectures.</p>
              </div>
              <div className="insight-card warning">
                 <h4>Concise Storytelling Needed</h4>
                 <p>Your behavioral answers using the STAR method tend to run long. Try to keep "Action" and "Result" to under 2 minutes combined.</p>
                 <button className="btn-secondary small mt-8">Practice STAR Method</button>
              </div>
              <div className="insight-card info">
                 <h4>Pacing Analysis</h4>
                 <p>Your average speaking rate is 145 WPM, which is optimal for clarity and engagement during remote interviews.</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
