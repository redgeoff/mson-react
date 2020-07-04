import React from 'react';
import attach from './attach';
import Component from './component';

class Fragment extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {this.props.items.map((item, index) => (
          <Component component={item} key={index} />
        ))}
      </React.Fragment>
    );
  }
}

export default attach(['items'])(Fragment);
