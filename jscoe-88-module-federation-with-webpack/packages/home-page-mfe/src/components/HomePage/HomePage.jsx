import React from 'LibMFE/react'
import content from 'ContentMFE/content'

import './HomePage.css'

const HomePage = () => {
  const {
    pageContent: { homePage }
  } = content
  const { banner } = homePage
  const { title, subTitle, image } = banner

  return (
    <div className="home-page-banner">
      <img src={image} alt="" />
      <div className="content">
        <div className="left-col">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </div>
        <div className="right-col">&nbsp;</div>
      </div>
    </div>
  )
}

export default HomePage
