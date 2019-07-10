import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Modal } from '@material-ui/core';
import Iframe from 'react-iframe';

const styles = theme => ({
  container: {
    flexGrow: 1,
    maxWidth: '100%',
    maxHeight: '95%',
    backgroundColor: theme.palette.transparent,
    color: theme.palette.primary2.main,
  },
  paper: {
    margin: '84px 3% 36px 3%',
    padding: '1%',
    backgroundColor: theme.palette.canvas6,
    color: theme.palette.primary2.main,
    height: '90%',
    maxHeight: '90%',
    borderStyle: 'solid',
    borderColor: theme.palette.text.disabled,
    borderWidth: 'thin',
  },
  frame: {
    maxWidth: '100%',
    maxHeight: '90%',
    marginTop: '1%',
    padding: '1% 0',
    borderStyle: 'solid',
    borderColor: theme.palette.accent.main,
    borderWidth: 'thin',
  },
  title: {
    color: theme.palette.accent.main,
  },
  text: {
    color: theme.palette.primary2.main,
  },
});

const ModalBox = (props) => {
  const {
    classes, frameH, handleModalClose, modalURL, openModal,
  } = props;

  return (
    <Modal
      className={classes.container}
      id="modalBox"
      aria-labelledby="Project / Assignment"
      aria-describedby="Project / Assignment Displayed"
      open={openModal}
      onClose={handleModalClose}
    >

      <Paper
        className={classes.paper}
        styles={{
          height: `${frameH}220px`,
        }}
      >
        <Typography
          variant="display1"
          className={classes.title}
        >
          Project or Assignment is displayed below.
        </Typography>
        <Typography
          variant="headline"
          className={classes.text}
        >
          Most assignments and projects display correctly when viewed
          from a desktop PC and Not using any display Scaling.
          Please
          {' '}
          <a
            href={`http:/${modalURL}`}
            id="aModalIframe"
            target="_blank"
          >
            {' '}
            CLICK HERE
          </a>
          {' '}
          to open in a new tab.
        </Typography>
        <Iframe
          url={`http:/${modalURL}`}
          position="relative"
          id="modalIframe"
          // width={this.props.frameW}
          // height={this.props.frameH}
          width="100%"
          height="90%"
          styles={{ maxHeight: frameH }}
          allowFullScreen
          className={classes.frame}
        />
      </Paper>
    </Modal>
  );
};

ModalBox.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ModalBox);
