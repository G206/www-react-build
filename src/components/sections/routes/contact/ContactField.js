import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, FormControl, Input, InputLabel,
} from '@material-ui/core';


const styles = () => ({
});

function ContactField(props) {
  const {
    children, contactField, form, formField, handleInput,
    iconBox, id, inputBox, label, multiline, paper, rowsMax, secondaryC,
  } = props;

  return (
    <Paper className={paper}>
      <Grid
        container
        direction="row"
        spacing={16}
        justify="flex-start"
        alignItems="flex-end"
      >
        <Grid item className={iconBox}>
          {children}
        </Grid>
        <Grid item className={inputBox}>
          <FormControl className={form}>
            <InputLabel
              className={secondaryC}
              htmlFor="contactName"
            >
              {label}
            </InputLabel>
            <Input
              id={id}
              fullWidth
              type="text"
              value={contactField}
              onChange={handleInput}
              multiline={multiline}
              rowsMax={rowsMax}
              className={formField}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}

ContactField.propTypes = {
  children: PropTypes.object,
  paper: PropTypes.string,
  iconBox: PropTypes.string,
  inputBox: PropTypes.string,
  form: PropTypes.string,
  formField: PropTypes.string,
  secondaryC: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  contactField: PropTypes.string,
  multiline: PropTypes.bool,
  rowsMax: PropTypes.string,
  handleInput: PropTypes.func,
};

export default withStyles(styles)(ContactField);
