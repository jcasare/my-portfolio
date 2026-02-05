import React, { useState, useEffect } from 'react';
import './header.css';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBadgeCheck,
  HiOutlineClipboardList,
  HiOutlinePhotograph,
  HiOutlineMail,
  HiX,
  HiOutlineMenu,
} from 'react-icons/hi';

const Header = () => {
  const [Toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY >= 80) header.classList.add('scroll-header');
      else header.classList.remove('scroll-header');

      // Detect active section based on scroll position
      const sections = ['home', 'about', 'skills', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveNav(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <a href="/" className="nav__logo">
          &lt; iJay /&gt;
        </a>
        <div className={Toggle ? 'nav__menu show-menu' : 'nav__menu'}>
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="#home"
                onClick={(e) => {
                  setActiveNav('#home');
                  showMenu(false);
                }}
                className={
                  activeNav === '#home' ? 'nav__link active-link' : 'nav__link'
                }
              >
                <HiOutlineHome className="nav__icon" />
                Home
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#about"
                onClick={(e) => {
                  setActiveNav('#about');
                  showMenu(false);
                }}
                className={
                  activeNav === '#about' ? 'nav__link active-link' : 'nav__link'
                }
              >
                <HiOutlineUser className="nav__icon" />
                About
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#skills"
                onClick={(e) => {
                  setActiveNav('#skills');
                  showMenu(false);
                }}
                className={
                  activeNav === '#skills'
                    ? 'nav__link active-link'
                    : 'nav__link'
                }
              >
                <HiOutlineBadgeCheck className="nav__icon" />
                Skills
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#services"
                onClick={(e) => {
                  setActiveNav('#services');
                  showMenu(false);
                }}
                className={
                  activeNav === '#services'
                    ? 'nav__link active-link'
                    : 'nav__link'
                }
              >
                <HiOutlineClipboardList className="nav__icon" />
                Services
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#portfolio"
                onClick={(e) => {
                  setActiveNav('#portfolio');
                  showMenu(false);
                }}
                className={
                  activeNav === '#portfolio'
                    ? 'nav__link active-link'
                    : 'nav__link'
                }
              >
                <HiOutlinePhotograph className="nav__icon" />
                Projects
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#contact"
                onClick={(e) => {
                  setActiveNav('#contact');
                  showMenu(false);
                }}
                className={
                  activeNav === '#contact'
                    ? 'nav__link active-link'
                    : 'nav__link'
                }
              >
                <HiOutlineMail className="nav__icon" />
                Contact
              </a>
            </li>
          </ul>
          <HiX className="nav__close" onClick={() => showMenu(!Toggle)} />
        </div>
        <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
          <HiOutlineMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
