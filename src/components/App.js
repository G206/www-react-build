import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Nav from './sections/Nav';
import { hobbyList, portfolioList, yogaList } from '../data/itemList';


const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  '@global': {
    'a:link, a:visited, a:hover, a:active': {
      textDecoration: 'none',
    },
    'a:link': {
      color: theme.palette.primary2.main,
    },
    'a:visited': {
      color: theme.palette.primary2.main,
    },
    'a:hover': {
      color: theme.palette.secondary.main,
    },
    'a:active': {
      color: theme.palette.primary.main,
    },
    '.slider-list': {
      minHeight: '400px',
    },
  },
});

const App = (props) => {
  const { classes } = props;
  const assetsPath = require.context('./sections/routes/slides/images', false, /\.(png|jpe?g|svg)$/);

  // Substituting the imgSrc from file name in .../images
  // to their corresponding path after they are bundled.
  const appendImgSrc = (arr) => {
    arr.forEach((item) => {
      item.imgSrc = assetsPath(`./${item.imgSrc}`); // eslint-disable-line no-param-reassign
    });
  };

  appendImgSrc(portfolioList);
  appendImgSrc(yogaList);
  appendImgSrc(hobbyList);

  return (
    <div id="pageTop" className={classes.container}>
      <Nav />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(App);
