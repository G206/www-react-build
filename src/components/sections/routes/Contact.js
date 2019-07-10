import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import {
  AccountCircle, AlternateEmail, ContactPhone, Message,
} from '@material-ui/icons';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import ContactField from './contact/ContactField';
import ContactButtons from './contact/ContactButtons';

const styles = theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.canvas,
    color: theme.palette.primary2.main,
    margin: '15% 0',
    padding: '2% 0 5% 0',
  },
  heading: {
    color: theme.palette.primary.main,
    margin: '2% 0',
    textAlign: 'center',
  },
  iconBox: {
    color: theme.palette.accent.main,
    width: '10%',
    textAlign: 'center',
  },
  icon: {
    fontSize: '2.5em',
  },
  inputBox: {
    width: '85%',
  },
  form: {
    width: '100%',
  },
  formField: {
    fontSize: '1.5em',
  },
  paper: {
    margin: '1% 0 3% 0',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    borderWidth: 'thin',
  },
  btnBox: {

  },
  button: {
    width: '100%',
    fontSize: '1.5em',
  },
  primaryC: {
    color: theme.palette.text.primary,
  },
  secondaryC: {
    color: theme.palette.text.alternate,
  },
});

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EMAIL: 'gabe@w3dev.io',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactMessage: '',
      mailToLink: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    configureAnchors({
      offset: -72,
      scrollDuration: 800,
      keepLastAnchorHash: false,
    });
  }

  handleInput(event) {
    const { value, id } = event.target;
    // const target = event.target;
    // const value = target.value;
    // const id = target.id;
    this.setState({
      [id]: value,
    });
    this.createMailTo();
  }

  handleSubmit() {
    const { mailToLink } = this.state;
    console.log(`MailToLink: ${mailToLink}`);
  }

  handleReset() {
    this.setState({
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactMessage: '',
      mailToLink: '',
    });
  }

  createMailTo() {
    const {
      contactEmail, contactMessage,
      contactName, contactPhone, EMAIL,
    } = this.state;

    this.setState({
      mailToLink: `mailto:${EMAIL}?`
        + `subject=Email%20from%20${contactName}.%20Email:%20${contactEmail}.
        %20Contact%20Phone:%20${contactPhone}&body=${contactMessage}`,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      contactEmail, contactMessage,
      contactName, contactPhone, mailToLink,
    } = this.state;
    return (
      <ScrollableAnchor
        id="contact"
        name="contact"
      >
        <section
          className={classes.container}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.heading} variant="display2">
                                Contact Me
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <form id="contactForm">
                    <ContactField
                      {...classes}
                      label="Enter Your Name"
                      id="contactName"
                      contactField={contactName}
                      handleInput={this.handleInput}
                      multiline={false}
                      rowsMax="1"
                    >
                      <AccountCircle className={classes.icon} />
                    </ContactField>
                    <ContactField
                      {...classes}
                      label="Enter Your Email"
                      id="contactEmail"
                      contactField={contactEmail}
                      handleInput={this.handleInput}
                      multiline={false}
                      rowsMax="1"
                    >
                      <AlternateEmail className={classes.icon} />
                    </ContactField>
                    <ContactField
                      {...classes}
                      label="Enter Your Phone Number"
                      id="contactPhone"
                      contactField={contactPhone}
                      handleInput={this.handleInput}
                      multiline={false}
                      rowsMax="1"
                    >
                      <ContactPhone className={classes.icon} />
                    </ContactField>
                    <ContactField
                      {...classes}
                      label="Enter Your Message"
                      id="contactMessage"
                      contactField={contactMessage}
                      handleInput={this.handleInput}
                      multiline
                      rowsMax="3"
                    >
                      <Message className={classes.icon} />
                    </ContactField>
                    <ContactButtons
                      {...classes}
                      mailToLink={mailToLink}
                      handleSubmit={this.handleSubmit}
                      handleReset={this.handleReset}
                    />
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </ScrollableAnchor>
    );
  }
}
Contact.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles)(Contact);
