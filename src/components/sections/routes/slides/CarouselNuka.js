import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Carousel from 'nuka-carousel';


const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  slideImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  caption: {
    position: 'absolute',
    top: '75%',
    left: '0',
    right: '0',
    width: '75%',
    backgroundColor: theme.palette.canvas7,
    color: 'white',
    textAlign: 'center',
    margin: '0 auto',
    padding: '10px',
  },
  button: {
    padding: '8px',
    backgroundColor: theme.palette.canvas,
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    backgroundColor: theme.palette.canvas,
    color: theme.palette.text.secondary,
  },
  text: {
    padding: '6px',
    backgroundColor: theme.palette.canvas,
    color: theme.palette.text.secondary,
  },

});

class CarouselNuka extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { classes, slides } = this.props;

    const customSlideCpnts = slides.map((item, index) => (
      <div
        key={index}
      >
        <img
          src={item.imgSrc}
          alt={item.alt}
          id={item.id}
          className={classes.slideImage}
        />
        <p
          className={classes.caption}
        >
          {item.des}
        </p>
      </div>
    ));

    return (
      <Carousel
        renderTopCenterControls={({ currentSlide }) => (
          <div className={classes.text}>
                  Slide No.:
            {currentSlide + 1}
          </div>
        )}
        renderCenterLeftControls={({ previousSlide }) => (
          <div className={classes.buttonContainer}>
            <button
              onClick={previousSlide}
              className={classes.button}
              type="button"
            >
                    Prev
            </button>
          </div>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <div className={classes.buttonContainer}>
            <button
              onClick={nextSlide}
              className={classes.button}
              type="button"
            >
                    Next
            </button>
          </div>
        )}
        slidesToShow={3}
        cellAlign="center"
        autoplay
        autoplayInterval={6000}
        cellSpacing={24}
        heightMode="max"
        speed={1000}
        dragging
        swiping
        wrapAround
      >
        {customSlideCpnts}
      </Carousel>
    );
  }
}

CarouselNuka.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CarouselNuka);
