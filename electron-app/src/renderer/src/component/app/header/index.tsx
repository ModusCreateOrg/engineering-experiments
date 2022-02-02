import React, { memo } from 'react';
import {
  AppBar, Box, Toolbar, Typography,
} from '@mui/material';
import useStyle from './style';

const Header = ({ title }: { title: string }) => {
  const classes = useStyle();

  return (
    <Box className={classes.header}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(Header);
