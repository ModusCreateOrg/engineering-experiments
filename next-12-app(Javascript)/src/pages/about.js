import Script from 'next/script'
import Navbar from 'components/Navbar/Navbar'

const About = () => {
  return (
    <>
    <Navbar />
    <div className="container">
        <p className="my-5">
          This is a static page without any api calls.These icons are generated
          through font awesome cdn script only called on this page.
        </p>
        <div className="d-flex justify-content-center">
          <i className="fab fa-bitcoin fa-10x"></i>
          <i className="fab fa-ethereum fa-10x"></i>
          <i className="fab fa-gg fa-10x"></i>
        </div>
        <Script
          src="https://kit.fontawesome.com/888acd4b49.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        ></Script>
    </div>
    </>
  )
}

export default About