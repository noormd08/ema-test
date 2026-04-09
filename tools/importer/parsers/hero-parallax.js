/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-parallax
 * Base: hero
 * Source: https://www.olamgroup.com/
 * Selectors from captured DOM: .olam-image-banner.olam-image-banner__desktop
 */
export default function parse(element, { document }) {
  const img = element.querySelector('img');
  const title = element.querySelector('.olam-image-banner__title');
  const desc = element.querySelector('.olam-image-banner__desc p, .olam-image-banner__desc');
  const cta = element.querySelector('.olam-image-banner__cta a, .primary-button');

  const cells = [];

  // Row 1: background image
  if (img) {
    const imageCell = document.createElement('div');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    imageCell.appendChild(newImg);
    cells.push([imageCell]);
  }

  // Row 2: content (title + description + CTA)
  const contentCell = document.createElement('div');
  if (title) {
    const h = document.createElement('h2');
    h.textContent = title.textContent.trim();
    contentCell.appendChild(h);
  }
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    contentCell.appendChild(p);
  }
  if (cta) {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    contentCell.appendChild(a);
  }
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-parallax', cells });
  element.replaceWith(block);
}
