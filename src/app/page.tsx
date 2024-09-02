import { CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';

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
    <div className='min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative'>
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]'></div>
      <div className='py-8 p-4 grid grid-cols-2 gap-4'>
        <div className='avatar flex flex-col items-center'>
          <CardContainer>
            <CardItem translateZ='100' className='w-full mt-4'>
              <img
                className='inline-block h-[200px] w-[auto] md:h-[300px] rounded-full ring-[3px] ring-red-600'
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
          <h1 className='text-3xl py-1'>
            <FlipWords words={hello} />
          </h1>
          <h2 className='text-4xl px-2 py-1'>
            <span>{`I'm`}</span>
            <span className='text-rose-700 px-4'>Arvind Narayan</span>
          </h2>
          <h2 className='text-3xl'>
            <FlipWords words={does} />
          </h2>
          <p className='p-2 pt-8 w-[80%] font-normal text-sm text-gray-300 tracking-wide leading-relaxed'>
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
            <div className='flex py-4 m-[-2] flex-wrap'>
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
      <div id="timeline"></div>
    </div>
  );
}
