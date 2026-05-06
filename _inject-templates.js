#!/usr/bin/env node
/*
 * Template injection for shared nav, mobile-nav, and footer.
 *
 * Reads templates from /_templates/*.html and injects them into HTML files
 * between marker pairs:
 *   <!-- TEMPLATE:nav-start --> ... <!-- TEMPLATE:nav-end -->
 *   <!-- TEMPLATE:mobile-nav-start --> ... <!-- TEMPLATE:mobile-nav-end -->
 *   <!-- TEMPLATE:footer-start --> ... <!-- TEMPLATE:footer-end -->
 *
 * The mobile-nav template gets `class="is-current"` added to the link
 * matching the current page after injection (for the 9 pages that have
 * a corresponding mobile-nav link).
 *
 * Run: node _inject-templates.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_DIR = path.join(ROOT, '_templates');

const PAGES = [
  'index.html',
  'providers/index.html',
  'about/index.html',
  'careers/index.html',
  'contact/index.html',
  'faq/index.html',
  'blog/index.html',
  'terms/index.html',
  'privacy/index.html',
  'botox/index.html',
  'fillers/index.html',
  'hair-restoration/index.html'
];

const ACTIVE_PATH_MAP = {
  'index.html': '/',
  'providers/index.html': '/providers',
  'about/index.html': '/about',
  'careers/index.html': '/careers',
  'contact/index.html': '/contact',
  'faq/index.html': '/faq',
  'blog/index.html': '/blog',
  'terms/index.html': '/terms',
  'privacy/index.html': '/privacy'
};

function loadTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATE_DIR, name), 'utf8').replace(/\n$/, '');
}

const NAV = loadTemplate('nav.html');
const MOBILE_NAV = loadTemplate('mobile-nav.html');
const FOOTER = loadTemplate('footer.html');

function injectBetweenMarkers(content, startMarker, endMarker, replacement) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Markers not found: ${startMarker} / ${endMarker}`);
  }
  if (endIdx < startIdx) {
    throw new Error(`End marker before start marker: ${startMarker}`);
  }
  return content.slice(0, startIdx + startMarker.length)
       + '\n' + replacement + '\n'
       + content.slice(endIdx);
}

function applyActiveMobileNav(html, pagePath) {
  const target = ACTIVE_PATH_MAP[pagePath];
  if (!target) return html;
  const escapedTarget = target.replace(/\//g, '\\/');
  const re = new RegExp(`(<a href="${escapedTarget}")( onclick="closeNav\\(\\)">)`);
  return html.replace(re, '$1 class="is-current"$2');
}

let processed = 0;
for (const pagePath of PAGES) {
  const filePath = path.join(ROOT, pagePath);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${pagePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  content = injectBetweenMarkers(
    content,
    '<!-- TEMPLATE:nav-start -->',
    '<!-- TEMPLATE:nav-end -->',
    NAV
  );

  let mobileNavContent = MOBILE_NAV;
  mobileNavContent = applyActiveMobileNav(mobileNavContent, pagePath);
  content = injectBetweenMarkers(
    content,
    '<!-- TEMPLATE:mobile-nav-start -->',
    '<!-- TEMPLATE:mobile-nav-end -->',
    mobileNavContent
  );

  content = injectBetweenMarkers(
    content,
    '<!-- TEMPLATE:footer-start -->',
    '<!-- TEMPLATE:footer-end -->',
    FOOTER
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${pagePath}`);
  processed++;
}

console.log(`\n${processed} pages processed.`);
