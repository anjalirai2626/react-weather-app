import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

type WeatherAppBarProps = {
  title: string,
  primaryActions?: ReactNode,
  secondaryActions?: ReactNode
}

const WeatherAppBar = ({title, primaryActions, secondaryActions}: WeatherAppBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {primaryActions || <></>}
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          {secondaryActions || <></>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default WeatherAppBar;
