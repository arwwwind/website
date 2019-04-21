import React from 'react'
import '../style/style.scss'
import Layout from '../hoc/layout'
import Post from './../components/post'
import Zoom from 'react-reveal/Zoom'
import Slide from 'react-reveal/Slide'

class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      posts: [
        {
          title: 'Oath Gemini Ad Platform ( Yahoo )',
          desc:
            'A Hybrid App built on Android, iOS and as well as a PWA. This app helps advertisers with their Campaigns',
          url:
            'https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.gemini',
          image: '/static/2.png',
          class: 'blue'
        },
        {
          title: 'ad.com by Verizon media ( Yahoo )',
          desc: `A desktop and PWA that is powering SMB's with advertisments and campaigns. A minimalistic approach for advertisments.`,
          url: 'http://stg.ad.com',
          image: '/static/Bitmap.png',
          class: 'red'
        },
        {
          title: 'Apollo Construct by Katerra',
          desc: `Apollo is a mega tool used by construction giant katerra is managing constuction projects.`,
          url: 'https://apollo.katerra.com/',
          image: '/static/3.png',
          class: 'green'
        },
        {
          title: 'Reeltime Coaching',
          desc: `ReelTime Coaching is the elite athlete development platform that connects athletes with top coaches on demand.`,
          url: 'http://app.reeltimecoaching.com',
          image: '/static/4.png',
          class: 'yellow'
        },
        {
          title: 'Palava Resident Portal',
          desc: `A Resident Portal for Lodha's my palava built as a PWA. This app helps residents with day to day stuff in and around palava`,
          url: 'https://mypalava.in',
          image: '/static/5.png',
          class: 'blue'
        },
        {
          title: 'Pocketbits',
          desc: `PocketBits is professional crypto-platforms in India. whichprovide a digital asset trading platform built on ultra-modern services for digital currency traders and global liquidity providers.`,
          url: 'https://pocketbits.in',
          image: '/static/pb.png',
          class: 'red'
        }
      ]
    }
  }

  render () {
    return (
      <Layout>
        <div className='container'>
          <Slide top cascade>
            <div className='circle circle-1' />
          </Slide>
          <Slide left cascade>
            <div className='circle circle-2' />
          </Slide>
          <Slide right cascade>
            <div className='circle circle-3' />
          </Slide>
          <Slide bottom cascade>
            <div className='outline outline-1' />
          </Slide>
          <Slide right cascade>
            <div className='outline outline-2' />
          </Slide>
          <Slide left cascade>
            <div className='outline outline-3' />
          </Slide>
          <div className='nav-head'>
            <Zoom right cascade>
              <span className='logo bg-assets' />
            </Zoom>
          </div>
          <div className='infographic'>
            <Zoom right cascade>
              <span className='bg-assets dev' />
            </Zoom>
          </div>
          <div className='content-title'>
            <Zoom right cascade>
              <h1>I’m Arvind,</h1>
            </Zoom>
            <Zoom right cascade>
              <h3>Fullstack Developer & Freelance UX Designer</h3>
            </Zoom>
          </div>
          <Zoom bottom>
            <div className='content-body'>
              I build apps end to end aka Design - Front-end - Backend and a
              little bit of Dev-Ops. <br />
              I’m from most coolest places on Earth aka Bengaluru. I have close
              to 3.5 years of experience in building truly scalable products.
              You can see me mostly working on Javascript in all forms and
              sizes. I’m in love with React JS and have a love and hate
              relationship with Angular (first choice). I deal with massive SASS
              style sheets and colossal Redux architecture. I also love creating
              keyframe animation purely using CSS Keyframes.
              <br />I prefer to work on super fast Node JS in backend with
              databases like MongoDB, Postgres, Redis and ElasticSearch and also
              consume services like kafka, Docker, Sentry and Nginix. My current
              curiosity with Architecting Microservices has shed some light on
              services like AWS / GCP and building at scale. I’m a recent fan of
              Serverless services.
              <br />
              I also consult firms on UX design. The Sketch is my choice of
              weapon, Sometimes I work with Illustrator and Photoshop for the
              finishing touches. I’m a fan on negative spaces and minimalist UI.
              <br />
              I’m keen on delivering the best User Experience on the products I
              work on that is my professional mission!
              <br />I currently work at Cognitveclouds and a SDE-2. Feel free
              <a
                href='mailto:thearvindnarayan@gmail.com?Subject=Hey%20Arvind'
                className='mail'
              >
                &nbsp; Slide in a Mail &nbsp;
              </a>
              regarding new opportunuties
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
                <b>&nbsp;Surge</b>
              </a>
              . Code is licensed under <b>MIT</b> and available at
              <a href='https://github.com/TheArvindNarayan/website' target='_blank'>
                <b>&nbsp;Github</b>
              </a>
              . All images/graphics are licensed under <b>CC BY-SA</b>
            </span>
            <span className='copy'>©2019 Arvind Narayan</span>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index
