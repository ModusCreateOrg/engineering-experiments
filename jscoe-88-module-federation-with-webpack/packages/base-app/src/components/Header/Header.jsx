import React from 'LibMFE/react'
import content from 'ContentMFE/content'
import './Header.css'

const Header = () => {
  const {
    appContent: { navItems }
  } = content

  return (
    <div className="main-header">
      <div className="logo-section">Modus Create</div>
      <ul className="nav-items">
        {navItems.map(({ id, title, url }) => (
          <li className="nav-item" key={id}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Header
