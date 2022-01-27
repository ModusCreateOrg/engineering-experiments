const imageServerUrl = 'http://localhost:8083' // Currently served from this package / project
const content = {
  appContent: {
    navItems: [
      {
        id: 'contact',
        title: 'Contact',
        url: '/contact'
      },
      {
        id: 'about',
        title: 'About',
        url: '/about'
      }
    ]
  },
  pageContent: {
    homePage: {
      banner: {
        title: 'Build for the Digital Future',
        subTitle:
          'Modernize your customer interactions and transform the way your business works.',
        image: `${imageServerUrl}/images/Modus-Hero-2.jpg`
      }
    },
    contactPage: {
      banner: {
        title: 'Contact',
        subTitle: "Let's chat.",
        image: `${imageServerUrl}/images/Contact-Modus-RO.png`
      }
    },
    aboutPage: {
      banner: {
        title: 'About Modus',
        subTitle: 'Redefining consulting for the digital age.',
        image: `${imageServerUrl}/images/About-Modus-DC-HQ.png`
      }
    }
  }
}

export default content
