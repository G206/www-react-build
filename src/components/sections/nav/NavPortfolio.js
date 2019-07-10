import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  ClickAwayListener, Paper, MenuItem, MenuList, Popover,
} from '@material-ui/core';

const styles = theme => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.transparent,
  },
  paper: {
    backgroundColor: theme.palette.canvas,
  },

});

function NavPortfolio(props) {
  const {
    anchorEl, classes, handleClose, list, open, textColor,
  } = props;

  const createMenuItems = list.map((item, index) => (
    <MenuItem
      key={index}
      onClick={event => props.advancePortfolio(index, event)}
      className={textColor}
    >
      {item.des}
    </MenuItem>
  ));

  return (
    <ClickAwayListener
      onClickAway={handleClose}
    >
      <Popover
        className={classes.container}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper className={classes.paper}>
          <MenuList>
            {createMenuItems}
          </MenuList>
        </Paper>
      </Popover>
    </ClickAwayListener>
  );
}

NavPortfolio.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(NavPortfolio);
