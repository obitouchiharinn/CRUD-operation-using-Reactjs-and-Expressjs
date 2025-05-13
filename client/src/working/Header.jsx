import React from 'react'

function Header() {
    return (
        <header className="header">
          <div className="logo">MediBook</div>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/register">Book Appointment</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
      );
}

export default Header
