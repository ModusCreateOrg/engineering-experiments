const sizes = {
  mobileS: '20rem',
  mobileM: '23.25rem',
  mobileL: '26.25rem',
  mobileLandscape: '34rem',
  tablet: '48rem',
  laptop: '64rem',
};

export const mediaQueries = {
  mobileS: `only screen and (min-width: ${sizes.mobileS})`,
  mobileM: `only screen and (min-width: ${sizes.mobileM})`,
  mobileL: `only screen and (min-width: ${sizes.mobileL})`,
  mobileLandscape: `only screen and (min-width: ${sizes.mobileLandscape})`,
  tablet: `only screen and (min-width: ${sizes.tablet})`,
  laptop: `only screen and (min-width: ${sizes.laptop})`,
};
