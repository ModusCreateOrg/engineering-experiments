import React, { memo, useEffect, useState } from 'react';
import { Event } from 'electron';
import { Box } from '@mui/material';
import useStyles from './style';
import { VersionObj } from '../../../../typings';

const { ipcRenderer } = window.require('electron');

const Main = () => {
  const classes = useStyles();
  const [version, setVersion] = useState({} as VersionObj);

  useEffect(() => {
    const listner = (event: Event, message: VersionObj) => {
      setVersion(message);
    };

    ipcRenderer.on('load', listner);

    return () => {
      ipcRenderer.removeListener('load', listner);
    };
  }, []);

  return (
    <>
      <Box className={classes.box}>
        Chrome version
        {' '}
        {version.chrome}
      </Box>
      <Box className={classes.box}>
        Electron version
        {' '}
        {version.electron}
      </Box>
      <Box className={classes.box}>
        Node version
        {' '}
        {version.node}
      </Box>
    </>
  );
};

export default memo(Main);
