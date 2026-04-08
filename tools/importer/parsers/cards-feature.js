/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-feature
 * Base: cards
 * Source: https://www.olamgroup.com/
 * Handles multiple card patterns: large-icon-banner, cardcomponent, olam-related-article
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: large-icon-banner (stats icons with summary)
  if (element.classList.contains('large-icon-banner')) {
    const icons = element.querySelectorAll('.large-icon-banner__img img');
    icons.forEach((img) => {
      const imageCell = document.createElement('div');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      imageCell.appendChild(newImg);
      cells.push([imageCell]);
    });

    const summary = element.querySelector('.large-icon-banner__summary p');
    const cta = element.querySelector('.large-icon-banner__action a, .primary-button');
    if (summary || cta) {
      const textCell = document.createElement('div');
      if (summary) {
        const p = document.createElement('p');
        p.textContent = summary.textContent.trim();
        textCell.appendChild(p);
      }
      if (cta) {
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        textCell.appendChild(a);
      }
      cells.push([textCell]);
    }
  }

  // Pattern 2: card-content-wrapper (feature cards)
  else if (element.querySelector('.card-box-container')) {
    const img = element.querySelector('img.more-img, img');
    const heading = element.querySelector('.card-header, h3');
    const desc = element.querySelector('.card-description p, .card-description');
    const cta = element.querySelector('.card-action-container a, .primary-button');

    const imageCell = document.createElement('div');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      imageCell.appendChild(newImg);
    }

    const contentCell = document.createElement('div');
    if (heading) {
      const h = document.createElement('h3');
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

    cells.push([imageCell, contentCell]);
  }

  // Pattern 3: olam-related-article (news cards)
  else if (element.classList.contains('olam-related-article')) {
    const articles = element.querySelectorAll('.slick-slide:not(.slick-cloned) .olam-related-article__item');
    articles.forEach((article) => {
      const tag = article.querySelector('.tag');
      const date = article.querySelector('.olam-related-article__date');
      const title = article.querySelector('.olam-related-article__item-title, h4');
      const desc = article.querySelector('.olam-related-article__item-description');
      const link = article.querySelector('.olam-related-article__action-btn a');

      const contentCell = document.createElement('div');
      if (tag) {
        const em = document.createElement('em');
        em.textContent = tag.textContent.trim();
        contentCell.appendChild(em);
      }
      if (date) {
        const small = document.createElement('p');
        small.textContent = date.textContent.trim();
        contentCell.appendChild(small);
      }
      if (title) {
        const h = document.createElement('h4');
        h.textContent = title.textContent.trim();
        contentCell.appendChild(h);
      }
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim().substring(0, 200) + '...';
        contentCell.appendChild(p);
      }
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        contentCell.appendChild(a);
      }

      cells.push([contentCell]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
