import React from 'react';
import Head from 'next/head';

// eslint-disable-next-line react/prefer-stateless-function
class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Arvind Narayan | Developer, UX and Product Strategy</title>
          <link rel='icon' href='/static/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css?family=Oxygen:400,700|Zilla+Slab:700&display=swap'
            rel='stylesheet'
          />
          <meta
            name='google-site-verification'
            content='hktiAE2S5msO9nPXh34N9oMi9QhwJ8vcw62WdkWwSLg'
          />
          <meta
            name='title'
            content='Arvind Narayan | Developer, UX and Product Strategy'
          />
          <meta
            name='description'
            content="Arvind Narayan is Developer, Freelance UX Designer and Product Strategist from Bangalore. He is a seasoned professional with experience in multiple domains. He's worked with startups to enterprises in providing solutions."
          />
          <meta
            name='keywords'
            content='arvind narayan, thearvindnarayan ,fullstack developer, bengaluru, bangalore, ux designer, react js, node js, react developer, react india, node india, react developer india, node developer india, indian developers'
          />
          <meta name='robots' content='index, follow' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='language' content='English' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta
            property='og:site_name'
            content='Arvind Narayan | Developer, UX and Product Strategy'
          />
          <meta property='og:url' content='https://www.pranaafood.com/' />
          <meta
            property='og:title'
            name='title'
            content='Arvind Narayan | Developer, UX and Product Strategy'
          />
          <meta name='twitter:url' content='https://www.pranaafood.com/' />
          <meta
            name='twitter:title'
            content='Arvind Narayan | Developer, UX and Product Strategy'
          />
          <meta
            name='twitter:site'
            content='Arvind Narayan | Developer, UX and Product Strategy'
          />
          <meta name='twitter:creator' content='Arvind Narayan' />
          <meta property='og:type' content='website' />
          <meta name='theme-color' content='#3c4040' />
          <meta
            property='og:image'
            content='https://avatars1.githubusercontent.com/u/26936172'
          />
          >
          <meta
            property='twitter:image'
            content='https://avatars1.githubusercontent.com/u/26936172'
          />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js'></script>
        </Head>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Layout;
