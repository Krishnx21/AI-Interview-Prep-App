import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, FileText, ChevronRight, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Decorative Network Grid */}
      <div className="neural-grid"></div>

      <nav className="home-nav">
        <div className="logo">
          <div className="logo-icon glow-purple"></div>
          <h2>NextPrep</h2>
        </div>
        <div className="nav-links">
          <span>Features</span>
          <span>Testimonials</span>
          <span>Pricing</span>
          <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Login</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="badge glass-card animate-float">
            <Zap size={16} className="text-pink text-gradient" />
            <span>AI-Powered Interview Coach 2.0</span>
          </div>
          
          <h1 className="hero-title">
            Master your next interview with <br/>
            <span className="text-gradient">Artificial Intelligence</span>
          </h1>
          
          <p className="hero-subtitle">
            Experience hyper-realistic mock interviews, instant resume analysis, and personalized feedback tailored to land your dream job at top-tier companies.
          </p>
          
          <div className="cta-group">
            <button className="btn-primary btn-lg" onClick={() => navigate('/interview')}>
              <Bot size={20} />
              Start Interview
              <ChevronRight size={20} />
            </button>
            <button className="btn-secondary btn-lg" onClick={() => navigate('/resume')}>
              <FileText size={20} />
              Analyze Resume
            </button>
          </div>
          
          <div className="stats-row glass-panel">
            <div className="stat">
              <h3>98%</h3>
              <p>Success Rate</p>
            </div>
            <div className="divider"></div>
            <div className="stat">
              <h3>50k+</h3>
              <p>Interviews</p>
            </div>
            <div className="divider"></div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Availability</p>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          {/* Abstract 3D/AI Visual representation */}
          <div className="glass-panel visual-box main-box">
             <div className="glass-card mock-chat">
                <div className="chat-bubble ai pulse">
                  "Hello, Krishna. Let's start with your background at Google."
                </div>
                <div className="chat-bubble user">
                  "Sure, I was a Senior Product Designer..."
                </div>
             </div>
             <div className="floating-element el-1 glass-card animate-float">
                <FileText size={24} color="var(--accent-blue)" />
                <div className="el-text">
                  <span>Resume Score</span>
                  <strong>94/100</strong>
                </div>
             </div>
             <div className="floating-element el-2 glass-card animate-float" style={{ animationDelay: '2s' }}>
                <Bot size={24} color="var(--accent-purple)" />
                <div className="el-text">
                  <span>Confidence</span>
                  <strong>High</strong>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
