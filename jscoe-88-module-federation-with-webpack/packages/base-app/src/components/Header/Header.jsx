import React from 'LibMFE/react'
import { Link } from 'LibMFE/react-router-dom'
import content from 'ContentMFE/content'
import './Header.css'

const Header = () => {
  const {
    appContent: { navItems }
  } = content

  return (
    <div className="main-header">
      <div className="logo-section">
        <Link to="/">Modus Create</Link>
      </div>
      <ul className="nav-items">
        {navItems.map(({ id, title, url }) => (
          <li className="nav-item" key={id}>
            <Link to={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Header
