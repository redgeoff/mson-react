import React from 'react';
import attach from './attach';
import GridMui from '@material-ui/core/Grid';
import GridItem from './grid-item';

class Grid extends React.PureComponent {
  render() {
    return (
      <GridMui container>
        {this.props.items.map((item, index) => (
          <GridItem component={item} key={index} />
        ))}
      </GridMui>
    );
  }
}

export default attach(['items'])(Grid);
