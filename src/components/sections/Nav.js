import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter as Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import NavAppBar from './nav/NavAppBar';
import NavDrawer from './nav/NavDrawer';
import Header from './Header';
import Routes from './Routes';
import Footer from './Footer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.transparent,
  },
  text: {
    color: theme.palette.text.accent,
  },
  leftJust: {
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'text-bottom',
    width: '49%',
  },
  rightJust: {
    display: 'inline-block',
    textAlign: 'right',
    verticalAlign: 'text-bottom',
    width: '49%',
  },
  logo: {
    maxHeight: 60,
  },
  navBar: {
    backgroundColor: theme.palette.primary.transparent,
  },
  appBar: {
    position: 'fixed',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftLeft: {
    marginLeft: drawerWidth,
  },
  appBarShiftRight: {
    marginRight: drawerWidth,
  },
  menuButton: {
    margin: '0 1%',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.transparent,
  },
  drawerHeader: {
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.transparent,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentLeft: {
    marginLeft: 0,
  },
  contentRight: {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShiftLeft: {
    marginLeft: drawerWidth,
  },
  contentShiftRight: {
    marginRight: drawerWidth,
  },
});

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: 'Left',
      openDrawer: false,
      portfolioIndex: 0,
    };
  }

  advancePortfolio = (slideIndex) => {
    this.setState({ portfolioIndex: slideIndex });
  };

  handleDrawerOpen = () => {
    this.setState({ openDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };

  render() {
    const { classes } = this.props;
    const { anchor, openDrawer, portfolioIndex } = this.state;

    return (
      <Router basename={''}>
        <nav
          className={classNames(classes.root)}
          id="mainNav"
        >
          <NavAppBar
            {...classes}
            {...this.state}
            handleDrawerOpen={this.handleDrawerOpen}
          />
          <NavDrawer
            {...classes}
            {...this.state}
            handleDrawerClose={this.handleDrawerClose}
            advancePortfolio={this.advancePortfolio}
          />
          <div
            className={classNames(classes.content, classes[`content-${anchor}`],
              {
                [classes.contentShift]: openDrawer,
                [classes[`contentShift${anchor}`]]: openDrawer,
              },
              'element')}
          >
            <Header />
            <Routes
              portfolioIndex={portfolioIndex}
              advancePortfolio={this.advancePortfolio}
            />
          </div>
          <Footer />
        </nav>
      </Router>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles)(Nav);
