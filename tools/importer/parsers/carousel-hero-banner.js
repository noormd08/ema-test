/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-hero-banner
 * Base: carousel
 * Source: https://www.olamgroup.com/
 * Selectors from captured DOM: .banner_carousel .slick-slide (non-cloned)
 */
export default function parse(element, { document }) {
  // Each non-cloned slide becomes a row: [image, content (title + CTAs)]
  const slides = element.querySelectorAll('.slick-slide:not(.slick-cloned)');
  const cells = [];

  slides.forEach((slide) => {
    const img = slide.querySelector('.olam-banner__image-container img, picture img');
    const title = slide.querySelector('.olam-banner__title, h1');
    const primaryBtn = slide.querySelector('.olam-banner__action-btn--primary, .primary-button');
    const secondaryBtn = slide.querySelector('.olam-banner__action-btn--tertiary, .tertiary-button');

    const imageCell = document.createElement('div');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      imageCell.appendChild(newImg);
    }

    const contentCell = document.createElement('div');
    if (title) {
      const h = document.createElement('h1');
      h.textContent = title.textContent.trim();
      contentCell.appendChild(h);
    }
    if (primaryBtn) {
      const a = document.createElement('a');
      a.href = primaryBtn.href;
      a.textContent = primaryBtn.textContent.trim();
      contentCell.appendChild(a);
    }
    if (secondaryBtn) {
      const a = document.createElement('a');
      a.href = secondaryBtn.href;
      a.textContent = secondaryBtn.textContent.trim();
      contentCell.appendChild(a);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero-banner', cells });
  element.replaceWith(block);
}
