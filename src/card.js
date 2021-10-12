import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Component from './component';
import Typography from '@mui/material/Typography';

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  content: {
    flex: 1, // TODO: needed?
  },
});

class Card extends React.PureComponent {
  render() {
    const { classes, component } = this.props;

    const content = component.get('content');
    const title = component.get('title');

    return (
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} sm={9} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap">
              <Grid item className={classes.content}>
                <Typography variant="h5" component="h2">
                  {title}
                </Typography>
                <Component component={content} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Card);
