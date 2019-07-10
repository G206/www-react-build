import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Send, Clear } from '@material-ui/icons';


const styles = () => ({

});

function ContactButtons(props) {
  const {
    btnBox, button, handleReset, handleSubmit,
    mailToLink, primaryC, secondaryC,
  } = props;

  return (
    <Grid
      container
      direction="row"
      spacing={16}
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs className={btnBox}>
        <a
          href={mailToLink}
          onClick={event => handleSubmit(event)}
        >
          <Button
            variant="contained"
            size="large"
            id="btnSubmit"
            color="primary"
            type="button"
            className={classNames(button, primaryC)}
          >
              Send Message
            <Send />
          </Button>
        </a>

      </Grid>
      <Grid item xs className={btnBox}>
        <Button
          variant="contained"
          size="large"
          id="btnReset"
          color="secondary"
          type="reset"
          onClick={event => handleReset(event)}
          className={classNames(button, secondaryC)}
        >
            Reset Form
          <Clear />
        </Button>
      </Grid>
    </Grid>
  );
}

ContactButtons.propTypes = {
  btnBox: PropTypes.string,
  button: PropTypes.string,
  primaryC: PropTypes.string,
  secondaryC: PropTypes.string,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  mailToLink: PropTypes.string,
};

export default withStyles(styles)(ContactButtons);
