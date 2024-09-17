import { CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import { Spotlight } from '@/components/ui/spotlight';
import { Timeline } from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function Home() {
  const hello = ['Hi,', 'Hello,', 'Hallo,', 'Hola!', 'Bonjour,'];
  const does = [
    'Senior Engineer',
    'Senior Architect',
    'Freelance Developer',
    'Problem Solver',
    'Dog Dad!',
  ];
  return (
    <div className='min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.15] bg-grid-black/[0.2] relative'>
      <Spotlight
        className='-top-40 left-[-4px] top-[-43rem] md:left-60 md:top-[-40rem]'
        fill='white'
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute z-[-1] pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]'></div>
      <div className='py-8 p-4 grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4'>
        <div className='avatar flex flex-col items-center'>
          <CardContainer>
            <CardItem translateZ='100' className='w-full mt-4'>
              <Image
                className='inline-block h-[200px] w-[auto] md:h-[300px] rounded-full ring-[3px] ring-red-600'
                width={300}
                height={300}
                src='/avatar.png'
                alt='Arvind Narayan'
              />
            </CardItem>
          </CardContainer>

          <div className='py-2 pt-0 flex '>
            <a
              href='https://calendly.com/thearvindnarayan/15min'
              target='_blank'
              rel='noopener noreferrer'
              className='px-2'
            >
              <button
                type='button'
                className='text-white bg-rose-800 hover:bg-red-700 ring-2 focus:outline-none ring-rose-400 font-medium rounded-lg text-sm px-4 py-2 text-center hover:bg-gradient-to-b from-rose-600 to-rose-900 transition ease-in-out flex items-center'
              >
                <i className='lni lni-google-meet px-1'></i>
                <span>1:1 Chat</span>
              </button>
            </a>
            <a
              href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'
              target='_blank'
              rel='noopener noreferrer'
              className='px-2'
            >
              <button
                type='button'
                className='text-white hover:text-rose-700 bg-neutral-800 hover:bg-neutral-900 ring-2 focus:outline-none ring-gray-500 hover:ring-rose-700 font-medium rounded-lg text-sm px-4 py-2 text-center ease-in-out flex items-center'
              >
                <i className='lni lni-envelope px-1'></i>
                <span>Email</span>
              </button>
            </a>
          </div>
          <div className='py-2 flex'>
            <a
              href='https://www.linkedin.com/in/arwwwind/'
              target='_blank'
              rel='noopener noreferrer'
              className='px-2'
            >
              <Button variant='outline'>
                <i className='lni lni-linkedin-original px-1'></i>
                <span>Connect</span>
              </Button>
            </a>
            <a
              href='https://github.com/arwwwind'
              target='_blank'
              rel='noopener noreferrer'
              className='px-2'
            >
              <Button variant='outline'>
                <i className='lni lni-github-original px-1'></i>
                <span>Github</span>
              </Button>
            </a>
          </div>
        </div>
        <div className='intro font-bold'>
          <h1 className='text-2xl md:text-3xl py-1'>
            <FlipWords words={hello} />
          </h1>
          <h2 className='text-3xl md:text-4xl px-2 py-1'>
            <span>{`I'm`}</span>
            <span className='text-rose-700 px-4'>Arvind Narayan</span>
          </h2>
          <h2 className='text-2xl md:text-3xl'>
            <FlipWords words={does} />
          </h2>
          <p className='p-2 pt-8 md:w-[80%] font-normal text-sm text-gray-300 tracking-wide leading-relaxed'>
            I’m an engineer with six years in backend and frontend development,
            wrangling code and leading teams to build cool stuff. I’ve
            turbocharged upGrad’s Learning Management System and revived Yahoo’s
            ad builder, making them all shiny and user-friendly. At Egen, I’m
            cooking up API magic and streamlining operations. My toolkit
            includes Node, React.JS, Python, and AWS, but I’m always game for
            whatever tech stack your project needs. When I’m not deep in code at
            work, I’m on the lookout for fun freelance gigs. Need a tech lead or
            a quick, crafty solution? I’m your guy, bringing skills and a
            sprinkle of humor to the table.
          </p>
          <div className='flex flex-col w-[100%] p-4 items-start mt-4'>
            <h4 className='text-center text-3xl font-bold'>Current Stack</h4>
            <div className='flex py-4 m-[-2] flex-wrap justify-center'>
              <a href='https://www.typescriptlang.org/'>
                <div
                  style={{ backgroundImage: 'url("/ts.svg")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>Typescript</span>
                </div>
              </a>
              <a href='https://www.python.org/'>
                <div
                  style={{ backgroundImage: 'url("/py.png")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>Python</span>
                </div>
              </a>
              <a href='https://www.react.dev/'>
                <div
                  style={{ backgroundImage: 'url("/react.png")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>React</span>
                </div>
              </a>
              <a href='https://nodejs.org/'>
                <div
                  style={{ backgroundImage: 'url("/node.png")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>Node</span>
                </div>
              </a>
              <a href='https://aws.amazon.com/'>
                <div
                  style={{ backgroundImage: 'url("/aws.png")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>AWS</span>
                </div>
              </a>
              <a href='https://www.postgresql.org/'>
                <div
                  style={{ backgroundImage: 'url("/pg.png")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>Postgresql</span>
                </div>
              </a>
              <a href='https://redis.io/'>
                <div
                  style={{ backgroundImage: 'url("/redis.svg")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>Redis</span>
                </div>
              </a>
              <a href='https://www.mongodb.com/'>
                <div
                  style={{ backgroundImage: 'url("/mongo.svg")' }}
                  className='stack-item w-[50px] h-[50px] bg-contain bg-center saturate-0 hover:saturate-100 bg-no-repeat m-2'
                >
                  <span className='hidden'>Mongo</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id='timeline' className='py-8 p-4 '>
        <Timeline data={exp} />
      </div>
    </div>
  );
}

const exp = [
  {
    title: '2004',
    content: (
      <div>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Built a grade calculator in <Badge variant='secondary'>BASIC</Badge>{' '}
          as a project while learning coding for the first time.
        </p>
      </div>
    ),
  },
  {
    title: '2010',
    content: (
      <div>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Built the my first personal website using{' '}
          <Badge variant='secondary'> HTML</Badge>
          <Badge variant='secondary'> CSS</Badge>
          and the infamous
          <Badge variant='secondary'> {`<marquee />`}</Badge> Technology.
        </p>
      </div>
    ),
  },
  {
    title: '2014-2017',
    content: (
      <div>
        <h2 className='text-l md:text-2xl mb-4 text-black dark:text-white max-w-4xl font-bold'>
          Freelance
        </h2>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Worked on designing, branding, market strategy and building website
          for various clients on upwork, Fiverr and others. As means to make
          pocket money during college.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Worked on UI UX and web for{' '}
          <a href='https://primetenders.com/'>Primetenders</a> v2.0 of their
          search product. Also improved their branding and web presence.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image
            src='/primenumbers.png'
            alt='primenumbers'
            width={1200}
            height={600}
            className='rounded-lg object-cover h-18 md:h-34 lg:h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
        </div>
      </div>
    ),
  },
  {
    title: '2017',
    content: (
      <div>
        <h2 className='text-l md:text-2xl mb-4 text-black dark:text-white max-w-4xl font-bold'>
          <a href='https://www.fulfil.io/'>Fulfil.io</a>, Internship
        </h2>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Worked on the effort to redesign the UI for the entire product. Worked
          on building the CMS for the marketing team.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image
            src='/fulfil.png'
            alt='fulfil'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
        </div>
      </div>
    ),
  },
  {
    title: '2018-2019',
    content: (
      <div>
        <h2 className='text-l md:text-2xl mb-4 text-black dark:text-white max-w-4xl font-bold'>
          <a href='https://www.advertising.yahooinc.com/our-dsp/native'>
            yahoo!
          </a>
          , Software Development Engineer
        </h2>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Developed Gemini Android for Yahoo’s Ad Platform, increasing
          re-targeting and new user acquisition by 20%.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Pioneered hybrid web/native application development, expanding market
          reach to both Android and iOS users.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Created native libraries for Deeplinks and Advertising Related
          plugins, contributing to enhanced user engagement and ad performance.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image
            src='/ad.png'
            alt='ad'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
          <Image
            src='/adapp.png'
            alt='appadd'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
        </div>
      </div>
    ),
  },
  {
    title: '2019-2021',
    content: (
      <div>
        <h2 className='text-l md:text-2xl mb-4 text-black dark:text-white max-w-4xl font-bold'>
          <a href='https://www.upgrad.com/'>upGrad</a>, Technical Lead Engineer
        </h2>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Led a team to rebuild the entire{' '}
          <a href='https://learn.upgrad.com'>
            LMS (learning management system)
          </a>
          <a href='https://medium.com/technology-at-upgrad/how-we-improved-user-experience-by-building-a-lite-version-of-learner-experience-ui-2df5ee521a5f'>
            [Read Here]
          </a>{' '}
          achieving a 75% boost in lighthouse metrics and optimizing API
          responses to support 2G user demographics.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Drove the creation of{' '}
          <a href='https://www.upgrad.com/microlearn/short-videos'>
            upGrad Masterclass
          </a>
          , a new product offering, resulting in a 15% improvement in
          retargeting and cross-sales.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Revamped the <a href='https://tests.upgrad.com'>Test platform</a>,
          significantly increasing performance by up to 40%.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Mentored junior engineers, fostering a collaborative environment that
          emphasized continuous learning and growth.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image
            src='/lms.png'
            alt='lms'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
          <Image
            src='/masterclass.png'
            alt='masterclass'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
          <Image
            src='/spinx.png'
            alt='tests'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
        </div>
      </div>
    ),
  },
  {
    title: '2021-',
    content: (
      <div>
        <h2 className='text-l md:text-2xl mb-4 text-black dark:text-white max-w-4xl font-bold'>
          <a href='https://egen.ai/'>egen.ai</a>, Senior Engineer
        </h2>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Architected an API Management solution utilizing GraphQL, Redis, and
          gateway resolvers for <a href='DriveTime.com'>DriveTime.com</a>.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Led the development of a car exchange and buyback service integrating{' '}
          <a href='https://dmvdesk.com/'>DMV Desk</a>,{' '}
          <a href='https://www.kbb.com/'>KBB</a>, and{' '}
          <a href='https://www.carscommerce.inc/accutrade/'>Accutrade</a> for
          <a href='DriveTime.com'>DriveTime.com</a>, improving operational
          efficiency by 40%.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Designed and implemented a custom user onboarding wizard for a Vendor
          Management System called{' '}
          <a href='https://subclarity.com/'>subclarity</a>, automating a
          previously manual process and ensuring a fault-free system.
        </p>
        <p className='text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8'>
          Developed a custom Analytics dashboard with SQS and MongoDB for key
          stakeholders, enhancing decision-making through real-time KPI
          tracking.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image
            src='/sub.png'
            alt='subclarity'
            width={1400}
            height={500}
            className='rounded-lg object-cover h-15 md:h-38 lg:h-46 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
          />
        </div>
      </div>
    ),
  },
];
