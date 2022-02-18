import { ThemeOptions, SimplePaletteColorOptions } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: ThemeOptions) => ({
  box: {
    width: '99%',
    border: '1px solid',
    borderColor: (theme.palette?.primary as SimplePaletteColorOptions).main,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '700',
    textAlign: 'center',
    color: (theme.palette?.primary as SimplePaletteColorOptions).main,
    padding: '0.5rem',
    margin: '0.25rem 0.5%',
  },
}));
