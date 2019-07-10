import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import About from './About';
import Portfolio from './Portfolio';
import Yoga from './Yoga';
import Hobbies from './Hobbies';
import Contact from './Contact';
import Follow from './Follow';

const styles = () => ({
  container: {
  },
});

function Home(props) {
  // const { classes } = props;

  return (
    <Fragment>
      <About />
      <Portfolio {...props} />
      <Yoga />
      <Hobbies />
      <Contact />
      <Follow />
    </Fragment>

  );
}
Home.propTypes = {
  About: PropTypes.element,
  Portfolio: PropTypes.element,
  Yoga: PropTypes.element,
  Hobbies: PropTypes.element,
  Contact: PropTypes.element,
  Follow: PropTypes.element,
};

export default withStyles(styles)(Home);
