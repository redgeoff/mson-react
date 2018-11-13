import React from 'react';
import attach from './attach';
import GridMui from '@material-ui/core/Grid';
import Component from './component';

class GridItem extends React.PureComponent {
  render() {
    const { hidden, content, xl, lg, md, sm, xs } = this.props;
    if (hidden) {
      return null;
    } else {
      return (
        <GridMui item xl={xl} lg={lg} md={md} sm={sm} xs={xs}>
          <Component component={content} />
        </GridMui>
      );
    }
  }
}

export default attach(['hidden', 'content', 'xl', 'lg', 'md', 'sm', 'xs'])(
  GridItem
);
