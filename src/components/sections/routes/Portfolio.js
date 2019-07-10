import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { portfolioList } from '../../../data/itemList';
// import Carousel from './slides/carousel';
// import CarouselCustomSlider from './slides/carouselCustomSlider';
import CarouselNukaCustom from './slides/CarouselNukaCustom';

const styles = theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.canvas2,
    color: theme.palette.primary2.main,
    margin: '15% 0',
    padding: '2% 0 5% 0',
  },
  headingText: {
    color: theme.palette.primary.main,
    margin: '2% 0',
    textAlign: 'center',
  },
  slideContainer: {
    backgroundColor: theme.palette.canvas3,
    padding: '2%',
    borderStyle: 'solid',
    borderColor: theme.palette.accent.main,
    borderWidth: 'thin',
  },
});

class Portfolio extends Component {
  componentWillMount() {
    configureAnchors({
      offset: -72,
      scrollDuration: 800,
      keepLastAnchorHash: false,
    });
  }

  componentDidMount() {
    // eslint-disable-next-line
    () => { setTimeout(() => {}, 1500); };
  }

  render() {
    const { classes } = this.props;

    return (
      <ScrollableAnchor
        id="portfolio"
        name="portfolio"
      >
        <section
          className={classes.container}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.headingText} variant="display2">
                Portfolio
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.slideContainer}>
                <CarouselNukaCustom
                  slides={portfolioList}
                  {...this.props}
                />
              </Paper>
            </Grid>
          </Grid>
        </section>
      </ScrollableAnchor>
    );
  }
}


Portfolio.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles)(Portfolio);
