import React, { memo } from 'react';
import { Typography } from '@mui/material';
import useStyle from './style';

const Footer = () => {
  const classes = useStyle();

  return (
    <div className={classes.footer}>
      <Typography color="inherit" component="div">This is copyright info.</Typography>
    </div>
  );
};

export default memo(Footer);
