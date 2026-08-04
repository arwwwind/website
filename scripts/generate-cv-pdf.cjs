#!/usr/bin/env node
/**
 * Generates public/cv.pdf from src/data/cv.json.
 * Uses Chrome headless print-to-PDF so the file matches /cv.
 *
 * Usage: node scripts/generate-cv-pdf.cjs
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const os = require('os');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/cv.json'), 'utf8')
);
const outPdf = path.join(root, 'public/cv.pdf');

const {
  meta: cvMeta,
  about: cvAbout,
  skills: cvSkills,
  experience: cvExperience,
  education: cvEducation,
  recognition: cvRecognition,
} = data;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const skillsHtml = cvSkills
  .map(
    (s) => `
    <div class="skill">
      <div class="skill-label">${esc(s.label)}</div>
      <div class="skill-items">${esc(s.items)}</div>
    </div>`
  )
  .join('');

const expHtml = cvExperience
  .map((job) => {
    const projects = job.projects
      .map((p) => {
        const bullets = p.bullets.map((b) => `<li>${esc(b)}</li>`).join('');
        return `
        <div class="project">
          <h4>${esc(p.name)}</h4>
          <ul>${bullets}</ul>
        </div>`;
      })
      .join('');
    return `
    <article class="role">
      <div class="role-head">
        <div>
          <h3>${esc(job.company)}</h3>
          <p class="role-meta">${esc(job.role)}</p>
        </div>
        <span class="dates">${esc(job.dates)}</span>
      </div>
      ${projects}
    </article>`;
  })
  .join('');

const recogHtml = cvRecognition
  .map(
    (r) =>
      `<li><strong>${esc(r.title)}</strong> — <span class="muted">${esc(r.detail)}</span></li>`
  )
  .join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(cvMeta.name)} — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  @page { size: A4; margin: 12mm 12mm 12mm 12mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    font-size: 8.75pt;
    line-height: 1.42;
    color: #4a443f;
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 {
    font-family: 'Space Grotesk', system-ui, sans-serif;
  }
  h1 {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #2b2521;
    margin: 0 0 1pt;
    line-height: 1.1;
  }
  .title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 10pt;
    font-weight: 500;
    color: #8c7355;
    margin: 0 0 6pt;
  }
  .meta {
    font-size: 8pt;
    color: #8a8178;
    margin-bottom: 10pt;
    padding-bottom: 8pt;
    border-bottom: 1px solid #d9d0c4;
  }
  .meta span { margin: 0 3pt; color: #d9d0c4; }
  h2 {
    font-size: 7.5pt;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2b2521;
    margin: 0 0 5pt;
    padding-bottom: 2pt;
    border-bottom: 1.5px solid #2b2521;
  }
  section { margin-bottom: 9pt; }
  .about { margin: 0; font-size: 8.75pt; line-height: 1.45; }
  .skill {
    display: grid;
    grid-template-columns: 6.8rem 1fr;
    gap: 3pt 8pt;
    margin-bottom: 2.5pt;
    font-size: 8pt;
  }
  .skill-label {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 600;
    color: #2b2521;
    font-size: 7.5pt;
  }
  .role { margin-bottom: 8pt; }
  .role-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8pt;
    margin-bottom: 3pt;
  }
  .role h3 {
    font-size: 10pt;
    font-weight: 700;
    color: #2b2521;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .role-meta { margin: 0; font-size: 8pt; color: #8a8178; }
  .dates {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 7.5pt;
    font-weight: 500;
    color: #8a8178;
    white-space: nowrap;
  }
  .project {
    margin-bottom: 4.5pt;
    padding-left: 7pt;
    border-left: 2px solid #d9d0c4;
  }
  .project h4 {
    font-size: 8pt;
    font-weight: 600;
    color: #8c7355;
    margin: 0 0 2pt;
  }
  .project ul {
    margin: 0;
    padding: 0 0 0 11pt;
  }
  .project li {
    margin-bottom: 1.5pt;
    font-size: 8pt;
    line-height: 1.38;
  }
  .project li::marker { color: #c2a68e; }
  .edu {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 600;
    color: #2b2521;
    margin: 0;
    font-size: 9pt;
  }
  .recog { margin: 0; padding: 0; list-style: none; font-size: 8pt; }
  .recog li { margin-bottom: 2pt; }
  .recog strong {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    color: #2b2521;
  }
  .muted { color: #8a8178; }
</style>
</head>
<body>
  <header>
    <h1>${esc(cvMeta.name)}</h1>
    <p class="title">${esc(cvMeta.title)}</p>
    <div class="meta">
      ${esc(cvMeta.email)}
      <span>·</span>
      ${esc(cvMeta.phone)}
      <span>·</span>
      ${esc(cvMeta.website)}
      <span>·</span>
      ${esc(cvMeta.linkedin)}
      <span>·</span>
      ${esc(cvMeta.github)}
    </div>
  </header>

  <section>
    <h2>About</h2>
    <p class="about">${esc(cvAbout)}</p>
  </section>

  <section>
    <h2>Technical Skills</h2>
    ${skillsHtml}
  </section>

  <section>
    <h2>Experience</h2>
    ${expHtml}
  </section>

  <section>
    <h2>Education</h2>
    <p class="edu">${esc(cvEducation.degree)} — ${esc(cvEducation.school)} — ${esc(cvEducation.year)}</p>
  </section>

  <section>
    <h2>Recognition</h2>
    <ul class="recog">${recogHtml}</ul>
  </section>
</body>
</html>`;

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-pdf-'));
const htmlPath = path.join(tmpDir, 'cv.html');
fs.writeFileSync(htmlPath, html);

const chrome =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${outPdf}`,
    `file://${htmlPath}`,
  ],
  { encoding: 'utf8', timeout: 90000 }
);

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || 'Chrome failed');
  process.exit(result.status || 1);
}

console.log(`Wrote ${outPdf}`);
