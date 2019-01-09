import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../../assets/styles/common-footer.css';

export default class Header extends Component {
  render() {
    return (
      <div className="footer-container">
        <Grid container className="footer-grids">
          <Grid item xs={12} lg={3}>
            <Typography variant="h3" className="serif" color="primary">
              Just Blog
            </Typography>
          </Grid>

          <Grid item xs={12} lg={3}>
            Hiii
          </Grid>

          <Grid item xs={12} lg={3}>
            Hiii
          </Grid>

          <Grid item xs={12} lg={3}>
            Hiii
          </Grid>
        </Grid>
      </div>
    );
  }
}