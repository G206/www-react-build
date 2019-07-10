import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import ModalBox from './routes/ModalBox';
import Home from './routes/Home';
import About from './routes/About';
import Portfolio from './routes/Portfolio';
import Yoga from './routes/Yoga';
import Hobbies from './routes/Hobbies';
import Contact from './routes/Contact';
import Follow from './routes/Follow';

const styles = theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.transparent,
  },
});

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      url: '/',
      frameW: '100%',
      frameH: '100%',
    };
  }

    handleModalOpen = (pURL, pWidth, pHeight) => {
      this.setState({
        openModal: true,
        url: `/${pURL}`,
        frameW: pWidth,
        frameH: pHeight,
      });
    };

    handleModalClose = () => {
      this.setState({ openModal: false });
    };

    renderHome = () => {
      const { portfolioIndex, advancePortfolio } = this.props;
      const { openModal } = this.state;

      return (
        <Home
          openModal={openModal}
          handleModalClose={this.handleModalClose}
          handleModalOpen={this.handleModalOpen}
          portfolioIndex={portfolioIndex}
          advancePortfolio={advancePortfolio}
        />
      );
    };

  renderPortfolio = () => {
    const { portfolioIndex, advancePortfolio } = this.props;
    const { openModal } = this.state;

    return (
      <Portfolio
        openModal={openModal}
        handleModalClose={this.handleModalClose}
        handleModalOpen={this.handleModalOpen}
        portfolioIndex={portfolioIndex}
        advancePortfolio={advancePortfolio}
      />
    );
  };

  render() {
    const { classes } = this.props;
    const {
      frameW, frameH, openModal, url,
    } = this.state;

    return (
      <Fragment>
        <main className={classes.container}>
          <Route exact path="/" render={this.renderHome} />
          <Route path="/about" component={About} />
          <Route exact path="/portfolio" render={this.renderPortfolio} />
          <Route path="/yoga" component={Yoga} />
          <Route path="/hobbies" component={Hobbies} />
          <Route path="/contact" component={Contact} />
          <Route path="/follow" component={Follow} />
        </main>
        <ModalBox
          openModal={openModal}
          handleModalClose={this.handleModalClose}
          modalURL={url}
          frameW={frameW}
          frameH={frameH}
        />
      </Fragment>
    );
  }
}
Routes.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Routes);
