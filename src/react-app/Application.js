import React from 'react';

import Page from './Page/Page';

class Application extends React.Component {
  componentDidMount() {
    // TODO: add to global consts
    // ipcRenderer.on('');
  }

  render() {
    return (
      <Page />
    );
  }
}

export default Application;
