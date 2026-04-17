import React from 'react';

function Header({ title, courseCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <div className="header-stats">
          <span className="header-badge">📚 {courseCount} 门课程</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
