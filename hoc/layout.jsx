import React from 'react'
import Head from 'next/head'

// eslint-disable-next-line react/prefer-stateless-function
class Layout extends React.Component {
  sidebarToggle () {
    document.querySelector(`body`).classList.toggle('sidebar-active')
  }
  render () {
    return (
      <React.Fragment>
        <Head>
          <title>Arvind Narayan | Developer & Designer</title>
          <link rel='icon' href='/static/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css?family=Oxygen:400,700|Zilla+Slab:700'
            rel='stylesheet'
          />
          <meta name='title' content='Arvind Narayan | Developer & Desinger' />
          <meta
            name='description'
            content='Arvind Narayan Full-stack Develope and freelance UX Designer from Bengaluru, India. I specialise in React, Redux, Node js and sketch. I build Apps.'
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
            content='Arvind Narayan | Developer & Designer'
          />
          <meta property='og:url' content='https://www.pranaafood.com/' />
          <meta
            property='og:title'
            name='title'
            content='Arvind Narayan | Developer & Designer'
          />
          <meta name='twitter:url' content='https://www.pranaafood.com/' />
          <meta
            name='twitter:title'
            content='Arvind Narayan | Developer & Designer'
          />
          <meta
            name='twitter:site'
            content='Arvind Narayan | Developer & Designer'
          />
          <meta name='twitter:creator' content='Arvind Narayan' />
          <meta property='og:type' content='website' />
          <meta name='theme-color' content='#3c4040' />
          <meta property="og:image" content="https://avatars1.githubusercontent.com/u/26936172" />>
          <meta property="twitter:image" content="https://avatars1.githubusercontent.com/u/26936172" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js"></script>
        </Head>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default Layout
