import React from 'react';
import '../style/style.scss';
import Layout from '../hoc/layout';
import Post from './../components/post';
import Zoom from 'react-reveal/Zoom';
import globe from 'vanta/dist/vanta.globe.min';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {
          title: 'Pranaa | Whole Food Delivery',
          desc:
            'Pranaa is a exclusive food delivery app that is the online storefront of exclusive food products pranaa which is a based on Plant Based Whole Food which prootes wellness and healthy living',
          url: 'https://www.pranaafood.com',
          image: '/static/pranaa1.png',
          class: 'green',
        },
        {
          title: 'Ad Builder by Verzon Media (yahoo!)',
          desc: `A desktop and PWA that is powering SMB's with advertisments and campaigns. This application makes creation of ads as easy and intuitive as possible.`,
          url: 'http://ad.com',
          image: '/static/bitmap.png',
          class: 'red',
        },
        {
          title: 'Verizon Media Native (yahoo!)',
          desc:
            'A Hybrid App built on Android, iOS and as well as a PWA. This app helps advertisers with their Campaigns',
          url:
            'https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.gemini',
          image: '/static/2.png',
          class: 'blue',
        },
        {
          title: 'Apollo Construct by Katerra',
          desc: `Apollo is a suite of applications designed to support building projects and teams from beginning to end.`,
          url: 'https://apollo.katerra.com/',
          image: '/static/3.jpg',
          class: 'green',
        },
        {
          title: 'Reeltime Coaching',
          desc: `ReelTime Coaching is the elite athlete development platform that connects athletes with top coaches on demand. Thats right we worked with Icecube!`,
          url: 'http://beta.reeltimecoaching.com',
          image: '/static/4.jpg',
          class: 'yellow',
        },
        {
          title: 'Palava Resident Portal',
          desc: `A Resident Portal for Lodha's my palava built as a PWA. This app helps residents with day to day stuff in and around palava`,
          url: 'https://mypalava.in',
          image: '/static/5.png',
          class: 'blue',
        },
      ],
    };
    this.vantaRef = React.createRef();
  }

  componentDidMount() {
    this.vantaRef = globe({
      el: this.vantaRef.current,
      mouseControls: true,
      touchControls: true,
      minHeight: 550.0,
      minWidth: 550.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3b28ca,
      color2: 0xe63a45,
      size: 1.7,
      backgroundColor: 0xf0f0f0,
    });
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  render() {
    return (
      <Layout>
        <div className='container'>
          <div className='nav-head'>
            <Zoom right cascade>
              <span className='logo bg-assets' />
            </Zoom>
          </div>
          <div className='infographic' ref={this.vantaRef}></div>
          <div className='content-title'>
            <Zoom right cascade>
              <h1>Hello, I’m Arvind</h1>
            </Zoom>
            <Zoom right cascade>
              <h3>Product Developer & UX Designer</h3>
            </Zoom>
          </div>
          <Zoom right>
            <div className='content-body'>
              I architect solutions to products for a living👨🏽‍💻. Also cause
              building a well architected app gets me good sleep at night😴.
              <br />
              I call bangalore home🏠 and bagpack🗺️ when I'm not home. For the
              greater part of 3.5+ years⌛ I've built / hacked a ton of products
              and solutions. You can see me mostly working on Javascript in all
              forms and sizes. React and Node are the most important tools🧰 in
              my arsenal. I architect🦾 solutions and lead a team👥 of engineers
              as my day job.
              <br />I prefer to work on databases like MongoDB, Postgres, Redis
              and ElasticSearch. I use AWS, kafka, Docker, Sentry etc., to
              maintain my sanity while my applications scale📐 like no tomorrow.
              <br />I work💼 as Senior Software Engineer at{' '}
              <a href='upgrad.com'>upGrad</a>
              <br />I consult various clients regarding UX, Product and
              Development. You should check out my dribbble!
              <br />
              I've been coding👨🏻‍💻 since my 4th grade ⏳, designing for the past 5
              years and now I'm all about building🏗️ products and maintaing
              sanity😌.
              <br /> Feel free{' '}
              <a
                href='mailto:thearvindnarayan@gmail.com?Subject=Hey%20Arvind'
                className='mail'
              >
                Slide in a Mail📧
              </a>{' '}
              If you want to reach out for anything.
            </div>
          </Zoom>
          <Zoom bottom cascade>
            <div className='link-container'>
              <a
                href='https://dribbble.com/ImArvind'
                target='_blank'
                className='links dribble'
              >
                dribble
              </a>
              <a
                href='https://github.com/thearvindnarayan'
                target='_blank'
                className='links github'
              >
                github
              </a>
              <a
                href='https://medium.com/@thearvindnarayan'
                target='_blank'
                className='links medium'
              >
                medium
              </a>
              <a
                href='https://www.linkedin.com/in/thearvindnarayan/'
                target='_blank'
                className='links linkedin'
              >
                linkedin
              </a>
            </div>
          </Zoom>
          <Zoom cascade top>
            <div className='t-logo-container'>
              <a
                href='https://reactjs.org/'
                target='_blank'
                className='react tech-logo bg-assets'
              />
              <a
                href='https://redux.js.org/'
                target='_blank'
                className='redux tech-logo bg-assets'
              />
              <a
                href='https://nodejs.org/'
                target='_blank'
                className='node tech-logo bg-assets'
              />
              <a
                href='https://www.ecma-international.org'
                target='_blank'
                className='js tech-logo bg-assets'
              />
              <a
                href='https://www.sketch.com/'
                target='_blank'
                className='sketch tech-logo bg-assets'
              />
              <a
                href='https://angular.io'
                target='_blank'
                className='angular tech-logo bg-assets'
              />
              <a
                href='https://sass-lang.com/'
                target='_blank'
                className='sass tech-logo bg-assets'
              />
              <a
                href='https://getbootstrap.com'
                target='_blank'
                className='boot tech-logo bg-assets'
              />
              <a
                href='https://www.mongodb.com/'
                target='_blank'
                className='mongo tech-logo bg-assets'
              />
              <a
                href='https://redis.io/'
                target='_blank'
                className='redis tech-logo bg-assets'
              />
              <a
                href='https://www.elastic.co/products/elasticsearch'
                target='_blank'
                className='elastic tech-logo bg-assets'
              />
              <a
                href='https://www.postgresql.org/'
                target='_blank'
                className='pg tech-logo bg-assets'
              />
            </div>
          </Zoom>
          <div className='work-container'>
            {this.state.posts.map((p, i) => (
              <Post data={p} i={i} key={'post' + i} />
            ))}
          </div>
          <div className='foot'>
            <div className='mine bg-assets' />
            <span className='luv'>Made with ❤️ by Arvind Narayan</span>
            <span className='sidenote'>
              Hosted in
              <a href='https://surge.sh/' target='_blank'>
                <b>&nbspSurge</b>
              </a>
              . Code is licensed under <b>MIT</b> and available at
              <a
                href='https://github.com/TheArvindNarayan/website'
                target='_blank'
              >
                <b>&nbspGithub</b>
              </a>
              . All images/graphics are licensed under <b>CC BY-SA</b>
            </span>
            <span className='copy'>©2020 Arvind Narayan</span>
          </div>
        </div>
        <script
          async
          src='https://www.gstatic.com/firebasejs/7.13.2/firebase-analytics.js'
        ></script>
        <script
          async
          src='https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js'
        ></script>
        <script
          async
          src='https://www.gstatic.com/firebasejs/7.13.2/firebase-performance-standalone.js'
        ></script>
      </Layout>
    );
  }
}

export default Index;
