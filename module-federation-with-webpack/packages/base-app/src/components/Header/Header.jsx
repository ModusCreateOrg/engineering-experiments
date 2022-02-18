import React from 'LibMFE/react'
import { Link } from 'LibMFE/react-router-dom'
import content from 'ContentMFE/content'
import './Header.css'

const Header = () => {
  const {
      appContent: { navItems, header }
    } = content,
    { orgName, logoImage } = header

  return (
    <div className="main-header">
      <div className="logo-section">
        <img src={logoImage} alt="" height="80" width="80" />
        <Link to="/">{orgName}</Link>
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
