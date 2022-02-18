import React from 'LibMFE/react'
import content from 'ContentMFE/content'

import './AboutPage.css'

const AboutPage = () => {
  const {
    pageContent: { aboutPage }
  } = content
  const { banner } = aboutPage
  const { title, subTitle, image } = banner

  return (
    <div className="contact-page-banner">
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

export default AboutPage
