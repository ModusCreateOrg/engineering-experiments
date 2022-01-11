import React from 'LibMFE/react'
import './Header.css'

const navItems = ['services', 'about', 'contact']

const Header = () => {
  return (
    <div className="main-header">
      <div className="logo-section">Modus Create</div>
      <ul className="nav-items">
        {navItems.map(navItem => (
          <li className="nav-item" key={navItem}>
            {navItem}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Header
