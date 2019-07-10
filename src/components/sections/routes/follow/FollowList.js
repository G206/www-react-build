import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Popover, Typography, Grid, IconButton,
} from '@material-ui/core';
import { socialMediaList } from '../../../../data/itemList';

const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  modalBox: {
    padding: '2%',
    maxWidth: '960px',
  },
  modalItem: {
    width: '100%',
  },
  mediaContainer: {
    margin: '1% 0',
  },
  mediaBox: {
    margin: '0 auto',
  },
  mediaItem: {
    textAlign: 'center',
    fontSize: '3em',
    height: '2em',
    width: '2em',
  },
  icon: {
    textAlign: 'center',
    color: theme.palette.text.accent,
  },
  text: {
    color: theme.palette.text.alternate,
  },
  paper: {
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    borderWidth: 'thin',
  },

});

class FollowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.anchorEl = null;
    this.anchors = [null, null, null, null, null, null];
  }

    handleToggle = (node) => {
      const { open } = this.state;
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

    render() {
      const { classes } = this.props;
      const { open } = this.state;

      const SocialMediaLinks = socialMediaList.map((item, index) => (
        <Grid
          item
          xs
          key={index}
        >
          <div
            className={classes.mediaBox}
          >
            <IconButton
              buttonRef={(node) => {
                this.anchors[item.pos] = node;
              }}
              onClick={event => this.handleToggle(this.anchors[item.pos], event)}
              aria-label={item.des}
              className={classes.mediaItem}
            >
              <i className={classNames(item.icon, classes.icon)} />
            </IconButton>
          </div>
        </Grid>
      ));

      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={40}
          className={classes.mediaContainer}
        >

          {SocialMediaLinks}
          <ClickAwayListener onClickAway={this.handleClose}>
            <Popover
              open={open}
              onClose={this.handleClose}
              className={classes.paper}
              anchorEl={this.anchorEl}
              anchorReference="anchorEl"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={40}
                className={classes.modalBox}
              >
                <Grid
                  item
                  xs={12}
                  className={classes.modalItem}
                >
                  <Typography
                    variant="title"
                    className={classes.text}
                  >
                    Currently, I am not on social media and therefore the links
                    to the various social media sites do not currently work.
                    Please email me directly at gabe@w3dev.io with any inquiries
                    you might have. You can optionally also use the contact form
                    above to help you to start your email message. Eventually,
                    I plan on using social media for my various hobbies and to
                    update the links as I create the profiles. Thank you...Gabe
                  </Typography>
                </Grid>
              </Grid>
            </Popover>
          </ClickAwayListener>
        </Grid>
      );
    }
}

FollowList.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FollowList);
