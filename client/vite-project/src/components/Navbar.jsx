import React, { useState, useEffect } from 'react';
import './Navbar.css';  // See CSS below
// Replace these with your own SVG icons or use a library like react-icons for Menu/X icons

function Navbar({ onBookAppointment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openModalType, setOpenModalType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // For menu toggle (mobile)
  const toggleMenu = () => setIsOpen((v) => !v);

  // Sticky navbar + close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setIsDropdownOpen(false);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Styles for scroll effect
  const navbarStyle = {
    background: isScrolled
      ? 'linear-gradient(90deg, rgba(106,74,38,0.9) 0%,rgba(205,140,59,0.63) 25%,rgba(128,111,64,0.85) 50%,rgba(220,180,80,0.73) 75%,rgba(106,74,38,0.9))'
      : 'transparent',
    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
    borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.2)' : 'none',
    boxShadow: isScrolled ? '0 8px 20px rgba(0,0,0,0.2)' : 'none',
    transition: 'all 0.4s ease',
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="navbar-inner">
        {/* Left links */}
        <ul className="navbar-links navbar-links-left">
          <li><a href="/">Home</a></li>
          <li><a href="/about">Our Story</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/gallery">Gallery</a></li>
        </ul>
        
        {/* Center logo */}
        <div className="navbar-logo">
          <a href="/">
            <img
              src="/Images/vnlogo.png"
              alt="Vnexora Logo"
              width="85"
              height="79"
              style={{ background: 'transparent', objectFit: 'contain' }}
            />
          </a>
        </div>

        {/* Right links */}
        <ul className="navbar-links navbar-links-right">
          <li><a href="/OurAllies">Our Allies</a></li>
          <li><a href="/career">Careers</a></li>
          <li><a href="/contact">Contact</a></li>
          {/* Appointment Dropdown */}
          <li className="navbar-dropdown">
            <button onClick={() => setIsDropdownOpen((v) => !v)}>
              Book Appointment ▼
            </button>
            {isDropdownOpen && (
              <ul className="navbar-appointment-dropdown">
                <li>
                  <button onClick={() => { setOpenModalType('video'); setIsDropdownOpen(false); }}>
                    Schedule Video Call
                  </button>
                </li>
                <li>
                  <button onClick={() => { setOpenModalType('office'); setIsDropdownOpen(false); }}>
                    Office Visit
                  </button>
                </li>
                <li>
                  <button onClick={() => { setOpenModalType('site'); setIsDropdownOpen(false); }}>
                    Site Visit
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <button className="navbar-hamburger" onClick={toggleMenu}>
          {isOpen ?
            <span style={{ fontSize: 28 }}>✖</span>
            :
            <span style={{ fontSize: 28 }}>☰</span>
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="navbar-mobile-menu">
          <ul>
            <li><a href="/about" onClick={() => setIsOpen(false)}>Our Story</a></li>
            <li><a href="/services" onClick={() => setIsOpen(false)}>Services</a></li>
            <li><a href="/gallery" onClick={() => setIsOpen(false)}>Gallery</a></li>
            <li><a href="/OurAllies" onClick={() => setIsOpen(false)}>Our Allies</a></li>
            <li><a href="/career" onClick={() => setIsOpen(false)}>Careers</a></li>
            <li><a href="/contact" onClick={() => setIsOpen(false)}>Contact</a></li>
            <li className="navbar-dropdown">
              <button onClick={() => setIsDropdownOpen((v) => !v)}>
                Book Appointment ▼
              </button>
              {isDropdownOpen && (
                <ul className="navbar-appointment-dropdown">
                  <li>
                    <button onClick={() => { setOpenModalType('video'); setIsDropdownOpen(false); }}>
                      Schedule Video Call
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setOpenModalType('office'); setIsDropdownOpen(false); }}>
                      Office Visit
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setOpenModalType('site'); setIsDropdownOpen(false); }}>
                      Site Visit
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Modal placeholder */}
      {openModalType && (
        <div className="navbar-modal-bg" onClick={() => setOpenModalType(null)}>
          {/* You can use your AppointmentModel here */}
          <div className="navbar-modal" onClick={e => e.stopPropagation()}>
            <h3>Book: {openModalType === 'video' ? 'Video Call' : openModalType === 'office' ? 'Office Visit' : 'Site Visit'}</h3>
            <button onClick={() => setOpenModalType(null)}>Close</button>
            {/* Your modal content here */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
