import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  ListItem, ListItemIcon,
  Divider, Typography, Collapse,
} from '@material-ui/core';
import {
  Home, Work, Web, AccessibilityNew, PhotoLibrary,
  ContactMail, GroupAdd, ExpandLess, ExpandMore,
} from '@material-ui/icons';
import { goToAnchor } from 'react-scrollable-anchor';
import NavPortfolio from './NavPortfolio';
import NavPortfolioList from './NavPortfolioList';
import NavItem from './NavItem';
import { portfolioList } from '../../../data/itemList';

const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  text: {
    color: theme.palette.primary2.main,
  },
  textColorPrimary: {
    color: theme.palette.text.primary,
  },
  textColorAlternate: {
    color: theme.palette.text.alternate,
  },
  textColorDisabled: {
    color: theme.palette.text.disabled,
  },
  textColorMain: {
    color: theme.palette.text.main,
  },
  textColorAccent: {
    color: theme.palette.text.accent,
  },
});

class NavList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openNest: false,
    };
    this.anchorEl = null;
    this.anchors = [null, null];
  }

    handleToggle = (node) => {
      const { open } = this.state;
      goToAnchor('portfolio');
      this.setState({
        open: !open,
      });
      this.anchorEl = node;
    };


    handleClose = () => {
      this.setState({
        open: false,
      });
    };

    handleClick = () => {
      const { openNest } = this.state;
      this.setState({
        openNest: !openNest,
      });
    };

    scrollToAnchor = (anchor) => {
      // eslint-disable-next-line
      (anchor != null) ? goToAnchor(anchor) : null;
    };

    render() {
      const { classes, advancePortfolio } = this.props;
      const { open, openNest } = this.state;

      return (
        <div>
          <Typography
            variant="title"
            className={classes.text}
          >
            Scrolled Sections
          </Typography>
          <NavItem
            scrollToAnchor={this.scrollToAnchor}
            anchor="bannerWeb"
            text="Home"
            textColor={classes.textColorPrimary}
          >
            <Home />
          </NavItem>
          <Divider />
          <NavItem
            scrollToAnchor={this.scrollToAnchor}
            anchor="about"
            text="About"
            textColor={classes.textColorMain}
          >
            <Work />
          </NavItem>
          <ListItem
            button
            buttonRef={(node) => {
              this.anchors[0] = node;
            }}
            aria-owns={open ? 'NAV-list-grow' : null}
            aria-haspopup="true"
            onClick={event => this.handleToggle(this.anchors[0], event)}
          >
            <ListItemIcon>
              <Web />
            </ListItemIcon>
            <Typography
              variant="subheading"
              className={classes.textColorAccent}
            >
                        Portfolio
            </Typography>
          </ListItem>
          <Divider />
          <NavItem
            scrollToAnchor={this.scrollToAnchor}
            anchor="yoga"
            text="Yoga"
            textColor={classes.textColorMain}
          >
            <AccessibilityNew />
          </NavItem>
          <NavItem
            scrollToAnchor={this.scrollToAnchor}
            anchor="hobbies"
            text="Hobbies"
            textColor={classes.textColorMain}
          >
            <PhotoLibrary />
          </NavItem>
          <Divider />
          <NavItem
            scrollToAnchor={this.scrollToAnchor}
            anchor="contact"
            text="Contact"
            textColor={classes.textColorMain}
          >
            <ContactMail />
          </NavItem>
          <NavItem
            scrollToAnchor={this.scrollToAnchor}
            anchor="followMe"
            text="Follow Me"
            textColor={classes.textColorMain}
          >
            <GroupAdd />
          </NavItem>
          <Divider />
          <Typography
            variant="title"
            className={classes.text}
          >
                    Isolated Sections
          </Typography>
          <Link
            to="/"
          >
            <NavItem
              scrollToAnchor={this.scrollToAnchor}
              anchor={null}
              text="Home - All Sections"
              textColor={classes.textColorAccent}
            >
              <Home />
            </NavItem>
          </Link>
          <Link
            to="/about"
          >
            <NavItem
              scrollToAnchor={this.scrollToAnchor}
              anchor={null}
              text="About"
              textColor={classes.textColorDisabled}
            >
              <Work />
            </NavItem>
          </Link>
          <Link
            to="/portfolio"
          >
            <ListItem
              button
              aria-owns={open ? 'Portfolio-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <ListItemIcon>
                <Web />
              </ListItemIcon>
              <Typography
                variant="subheading"
                className={classes.textColorPrimary}
              >
                Portfolio
              </Typography>
              {openNest ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Link>
          <Collapse in={openNest} timeout="auto" unmountOnExit>
            <NavPortfolioList
              list={portfolioList}
              advancePortfolio={advancePortfolio}
              textColor={classes.textColorAccent}
            />
          </Collapse>
          <Link
            to="/yoga"
          >
            <NavItem
              scrollToAnchor={this.scrollToAnchor}
              anchor={null}
              text="Yoga"
              textColor={classes.textColorDisabled}
            >
              <AccessibilityNew />
            </NavItem>
          </Link>
          <Link
            to="/hobbies"
          >
            <NavItem
              scrollToAnchor={this.scrollToAnchor}
              anchor={null}
              text="Hobbies"
              textColor={classes.textColorDisabled}
            >
              <PhotoLibrary />
            </NavItem>
          </Link>
          <Link
            to="/contact"
          >
            <NavItem
              scrollToAnchor={this.scrollToAnchor}
              anchor={null}
              text="Contact"
              textColor={classes.textColorDisabled}
            >
              <ContactMail />
            </NavItem>
          </Link>
          <Link
            to="/follow"
          >
            <NavItem
              scrollToAnchor={this.scrollToAnchor}
              anchor={null}
              text="Follow Me"
              textColor={classes.textColorDisabled}
            >
              <GroupAdd />
            </NavItem>
          </Link>
          <NavPortfolio
            open={open}
            handleClose={this.handleClose}
            handleToggle={this.handleToggle}
            list={portfolioList}
            anchorEl={this.anchorEl}
            advancePortfolio={advancePortfolio}
            textColor={classes.textColorPrimary}
          />
        </div>
      );
    }
}

NavList.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(NavList);
