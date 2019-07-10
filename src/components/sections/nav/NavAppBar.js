import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logoImage from '../../../images/web_design.png';

const styles = () => ({
  container: {
  },
});

const NavAppBar = (props) => {
  const {
    navBar, appBar, appBarShift,
    appBarShiftLeft, appBarShiftRight, // eslint-disable-line no-unused-vars
    menuButton, hide, logo, text, leftJust, rightJust,
  } = props;
  const { anchor, handleDrawerOpen, openDrawer } = props;

  return (
    <AppBar
      position="sticky"
      className={classNames(navBar, appBar, {
        [appBarShift]: openDrawer,
        [[`appBarShift${anchor}`]]: openDrawer,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Nav Bar"
          onClick={handleDrawerOpen}
          className={classNames(menuButton, openDrawer && hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="display1"
          color="inherit"
          className={classNames(text, leftJust)}
        >
          <img src={logoImage} className={logo} alt="logo" />
          <Link to="/">
            G.Dev
          </Link>
        </Typography>
        <Typography
          variant="display1"
          color="inherit"
          className={classNames(text, rightJust)}
        >
          React JS
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

NavAppBar.propTypes = {
  navBar: PropTypes.string,
  appBar: PropTypes.string,
  appBarShift: PropTypes.string,
  appBarShiftLeft: PropTypes.string,
  appBarShiftRight: PropTypes.string,
  menuButton: PropTypes.string,
  hide: PropTypes.string,
  logo: PropTypes.string,
  text: PropTypes.string,
  leftJust: PropTypes.string,
  rightJust: PropTypes.string,
};

export default withStyles(styles)(NavAppBar);
