import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer, Divider, IconButton, List, Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import logoImage from '../../../images/web_design.png';
import NavList from './NavList';

const styles = () => ({
  container: {
  },
});

const NavDrawer = (props) => {
  const {
    drawerPaper, drawerHeader, logo, text,
  } = props;
  const { advancePortfolio, handleDrawerClose, openDrawer } = props;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={openDrawer}
      classes={{
        paper: drawerPaper,
      }}
    >
      <div className={drawerHeader}>
        <Typography
          variant="display1"
          color="inherit"
          className={text}
        >
          <img src={logoImage} className={logo} alt="logo" />
          G.Dev
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Typography>
        <Divider />
        <List>
          <NavList
            advancePortfolio={advancePortfolio}
          />
        </List>
      </div>
    </Drawer>
  );
};

NavDrawer.propTypes = {
  drawerPaper: PropTypes.string,
  drawerHeader: PropTypes.string,
  logo: PropTypes.string,
  text: PropTypes.string,
};

export default withStyles(styles)(NavDrawer);
