import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ScrollableAnchor from 'react-scrollable-anchor';
import logo from '../../images/web_ban_bottom.jpg';

const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  headerImg: {
    width: theme.image.width,
  },
});

const Header = (props) => {
  const { classes } = props;
  return (
    <ScrollableAnchor
      id="bannerWeb"
      name="bannerWeb"
    >
      <header
        className={classes.container}
      >
        <Grid container>
          <Grid item xs={12}>
            <img src={logo} className={classes.headerImg} alt="Banner Logo" />
          </Grid>
        </Grid>
      </header>
    </ScrollableAnchor>
  );
};

Header.propTypes = {
  classes: PropTypes.object,
};
export default withStyles(styles)(Header);
