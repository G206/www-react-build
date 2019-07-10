import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = () => ({
  container: {
  },
});

function NavItem(props) {
  const {
    anchor, children, scrollToAnchor, text, textColor,
  } = props;

  return (
    <ListItem
      button
      onClick={() => {
        scrollToAnchor(anchor);
      }}
    >
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <Typography
        variant="subheading"
        className={textColor}
      >
        {text}
      </Typography>
    </ListItem>
  );
}

NavItem.propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.object,
  scrollToAnchor: PropTypes.func,
  textColor: PropTypes.string,
  text: PropTypes.string,
};

export default withStyles(styles)(NavItem);
