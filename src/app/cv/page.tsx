import Link from 'next/link';
import {
  cvAbout,
  cvEducation,
  cvExperience,
  cvMeta,
  cvRecognition,
  cvSkills,
} from '@/data/cv';

export default function CvPage() {
  return (
    <>
      <header className='cv-nav'>
        <div className='cv-nav__inner'>
          <Link href='/' className='cv-nav__logo' aria-label='arwwwind home'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/logo.png' alt='arwwwind' className='cv-nav__logo-img' />
          </Link>
          <a
            href='/cv.pdf'
            download='Arvind-Narayan-CV.pdf'
            className='cv-nav__download'
          >
            Download PDF
          </a>
        </div>
      </header>

      <main className='cv-doc'>
        <header className='cv-header'>
          <h1 className='cv-header__name'>{cvMeta.name}</h1>
          <p className='cv-header__title'>{cvMeta.title}</p>
          <div className='cv-header__meta'>
            <a href={`mailto:${cvMeta.email}`}>{cvMeta.email}</a>
            <span className='cv-header__sep' aria-hidden>
              ·
            </span>
            <a href={`tel:${cvMeta.phone.replace(/\s/g, '')}`}>{cvMeta.phone}</a>
            <span className='cv-header__sep' aria-hidden>
              ·
            </span>
            <a href={cvMeta.websiteUrl} target='_blank' rel='noopener noreferrer'>
              {cvMeta.website}
            </a>
            <span className='cv-header__sep' aria-hidden>
              ·
            </span>
            <a
              href={cvMeta.linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {cvMeta.linkedin}
            </a>
            <span className='cv-header__sep' aria-hidden>
              ·
            </span>
            <a href={cvMeta.githubUrl} target='_blank' rel='noopener noreferrer'>
              {cvMeta.github}
            </a>
          </div>
        </header>

        <section className='cv-section' aria-labelledby='cv-about'>
          <h2 id='cv-about' className='cv-section__heading'>
            About
          </h2>
          <p className='cv-about'>{cvAbout}</p>
        </section>

        <section className='cv-section' aria-labelledby='cv-skills'>
          <h2 id='cv-skills' className='cv-section__heading'>
            Technical Skills
          </h2>
          <div className='cv-skills'>
            {cvSkills.map((skill) => (
              <div key={skill.label} className='cv-skill'>
                <div className='cv-skill__label'>{skill.label}</div>
                <div className='cv-skill__items'>{skill.items}</div>
              </div>
            ))}
          </div>
        </section>

        <section className='cv-section' aria-labelledby='cv-experience'>
          <h2 id='cv-experience' className='cv-section__heading'>
            Experience
          </h2>
          {cvExperience.map((job) => (
            <article key={job.company} className='cv-role'>
              <div className='cv-role__head'>
                <div>
                  <h3 className='cv-role__company'>
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <p className='cv-role__meta'>{job.role}</p>
                </div>
                <span className='cv-role__dates'>{job.dates}</span>
              </div>
              {job.projects.map((project) => (
                <div key={project.name} className='cv-project'>
                  <h4 className='cv-project__name'>{project.name}</h4>
                  <ul className='cv-project__bullets'>
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </section>

        <section className='cv-section' aria-labelledby='cv-education'>
          <h2 id='cv-education' className='cv-section__heading'>
            Education
          </h2>
          <p className='cv-edu'>
            {cvEducation.degree} — {cvEducation.school} — {cvEducation.year}
          </p>
        </section>

        <section className='cv-section' aria-labelledby='cv-recognition'>
          <h2 id='cv-recognition' className='cv-section__heading'>
            Recognition
          </h2>
          <ul className='cv-recog'>
            {cvRecognition.map((item) => (
              <li key={item.title}>
                <span className='cv-recog__title'>{item.title}</span>
                <span className='cv-recog__detail'> — {item.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
