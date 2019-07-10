import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'fixed',
    width: theme.image.width,
    bottom: 0,
    backgroundColor: theme.palette.primary2.transparent,
    color: theme.palette.text.primary,
    textAlign: 'center',
    padding: '12px 0',
  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <footer className={classes.container}>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="center"
      >
        <Grid item xs={12}>
          <Typography className={classes.heading} variant="body1">
            Copyright Gabe &copy; 2018 - This site has been created using React JS.
            Social Media Links Not Active Yet - Please Email Gabe@w3dev.io
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
