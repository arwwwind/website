import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

// eslint-disable-next-line react/prefer-stateless-function
class Layout extends React.Component {
  sidebarToggle() {
    document.querySelector(`body`).classList.toggle('sidebar-active');
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pranaa Whole Food</title>
          <link rel="icon" href="/static/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        <nav>head</nav>
        {this.props.children}
        <footer>footer</footer>
      </React.Fragment>
    );
  }
}

export default Layout;
