import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Scan, Search } from 'lucide-react';
import './ResumeAnalyzer.css';

const ResumeAnalyzer = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setAnalyzed(true);
    }, 2500);
  };

  return (
    <div className="resume-page">
      <div className="page-header">
        <h1>Resume AI Analyzer</h1>
        <p className="subtitle">Upload your resume to get instant AI-driven feedback against industry standards.</p>
      </div>

      {!analyzed ? (
        <div className="upload-container">
          <div 
            className={`upload-zone glass-panel ${isUploading ? 'analyzing' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={!isUploading ? simulateAnalysis : undefined}
          >
            {isUploading ? (
              <div className="analyzing-state">
                <div className="scan-line"></div>
                <Scan size={48} className="text-blue animate-pulse" />
                <h3>Analyzing your resume...</h3>
                <p>Checking ATS compatibility, keywords, and impact metrics.</p>
              </div>
            ) : (
              <div className="empty-state">
                <div className="upload-icon-wrapper glow-purple">
                   <UploadCloud size={32} color="white" />
                </div>
                <h3>Drag & Drop your resume</h3>
                <p>Supports PDF or DOCX (Max 5MB)</p>
                <button className="btn-secondary mt-16">Browse Files</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="analysis-results">
          {/* Top Level Score */}
          <div className="score-section glass-panel">
            <div className="score-visual">
               <div className="circular-progress large">
                 <div className="circle">
                   <div className="inner">82%</div>
                 </div>
                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px">
                    <circle cx="100" cy="100" r="90" strokeLinecap="round" />
                 </svg>
               </div>
            </div>
            <div className="score-summary">
               <h2>Great start! You're in the top 15%</h2>
               <p>Your resume shows strong experience, but there's room to improve your impact metrics and keyword optimization for the role of Senior Frontend Engineer.</p>
               
               <div className="score-badges">
                 <div className="badge success"><CheckCircle size={14} /> ATS Compatible</div>
                 <div className="badge warning"><AlertTriangle size={14} /> Action Verbs</div>
                 <div className="badge info"><Search size={14} /> Missing Keywords (React hooks, GraphQL)</div>
               </div>

               <div className="actions-row">
                 <button className="btn-primary">Download Optimized Resume</button>
                 <button className="btn-secondary" onClick={() => setAnalyzed(false)}>Upload Another</button>
               </div>
            </div>
          </div>

          <div className="suggestions-grid">
            <div className="suggestion-card glass-card">
               <div className="card-top">
                 <div className="icon-wrapper red"><AlertTriangle size={20} /></div>
                 <h3>Impact Metrics</h3>
               </div>
               <p>Instead of "Implemented new features", use quantifiable metrics:</p>
               <div className="before-after">
                 <div className="before">"Improved loading speed of the dashboard."</div>
                 <div className="after">"Reduced dashboard load time by 45% utilizing React lazy loading and memozation."</div>
               </div>
            </div>

            <div className="suggestion-card glass-card">
               <div className="card-top">
                 <div className="icon-wrapper blue"><Search size={20} /></div>
                 <h3>Missing Keywords</h3>
               </div>
               <p>Top missing keywords found in 80% of Senior Frontend job descriptions:</p>
               <div className="tags">
                 <span className="tag">Redux Toolkit</span>
                 <span className="tag">GraphQL</span>
                 <span className="tag">CI/CD</span>
                 <span className="tag">Web Vitals</span>
               </div>
            </div>

            <div className="suggestion-card glass-card span-full">
               <div className="card-top">
                 <div className="icon-wrapper green"><CheckCircle size={20} /></div>
                 <h3>Strengths Found</h3>
               </div>
               <ul className="strength-list">
                 <li><strong>Clear formatting:</strong> Good use of whitespace and standard headings.</li>
                 <li><strong>Strong progression:</strong> Shows clear career growth from Junior to Senior.</li>
                 <li><strong>Education section:</strong> Concisely places education without wasting valuable space.</li>
               </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
