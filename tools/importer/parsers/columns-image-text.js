/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-image-text
 * Base: columns
 * Source: https://www.olamgroup.com/
 * Selectors from captured DOM: .olam-textandimage
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.olam-textandimage__img img, img');
  const heading = element.querySelector('.olam-textandimage__content-title h2, h2');
  const desc = element.querySelector('.olam-textandimage__content-description p, .olam-textandimage__content-description');
  const cta = element.querySelector('.olam-textandimage__content-action a, .primary-button');

  const imageCell = document.createElement('div');
  if (img) {
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    imageCell.appendChild(newImg);
  }

  const contentCell = document.createElement('div');
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading.textContent.trim();
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

  const cells = [[imageCell, contentCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-image-text', cells });
  element.replaceWith(block);
}
