import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemIcon, Typography,
} from '@material-ui/core';
import { AssignmentTurnedInTwoTone } from '@material-ui/icons';

const styles = () => ({
  container: {
    flexGrow: 1,
    display: 'flex',
  },
  icon: {
    padding: '0',
    margin: '0',
  },
  text: {
    padding: '0',
    margin: '0',
    paddingLeft: '6px',
  },
  nested: {
    padding: '0',
    paddingBottom: '12px',
    paddingLeft: '40px',
  },
});

function NavPortfolioList(props) {
  const {
    advancePortfolio, classes, list, textColor,
  } = props;

  const createMenuItems = list.map((item, index) => (
    <ListItem
      key={index}
      button
      className={classes.nested}
      onClick={event => advancePortfolio(index, event)}
    >
      <ListItemIcon
        className={classes.icon}
      >
        <AssignmentTurnedInTwoTone />
      </ListItemIcon>
      <Typography
        variant="subheading"
        className={classNames(textColor, classes.text)}
      >
        {item.des}
      </Typography>
    </ListItem>
  ));

  return (
    <List component="div" disablePadding>
      {createMenuItems}
    </List>
  );
}

NavPortfolioList.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(NavPortfolioList);
