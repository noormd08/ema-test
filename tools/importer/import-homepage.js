/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroBannerParser from './parsers/carousel-hero-banner.js';
import columnsImageTextParser from './parsers/columns-image-text.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import heroParallaxParser from './parsers/hero-parallax.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/olamgroup-cleanup.js';
import sectionsTransformer from './transformers/olamgroup-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero-banner': carouselHeroBannerParser,
  'columns-image-text': columnsImageTextParser,
  'cards-feature': cardsFeatureParser,
  'hero-parallax': heroParallaxParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage with hero banner, card sections highlighting business groups, supply chain roles, and awards',
  urls: [
    'https://www.olamgroup.com/'
  ],
  blocks: [
    {
      name: 'carousel-hero-banner',
      instances: ['.bannercarousel.home-banner .banner_carousel']
    },
    {
      name: 'columns-image-text',
      instances: ['.olam-textandimage']
    },
    {
      name: 'cards-feature',
      instances: ['.large-icon-banner', '.cardcomponent .card-content-wrapper', '.olam-related-article']
    },
    {
      name: 'hero-parallax',
      instances: ['.olam-image-banner.olam-image-banner__desktop']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.bannercarousel.home-banner',
      style: null,
      blocks: ['carousel-hero-banner'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Re-imagining Agriculture',
      selector: '#backgroundcontainer-f46c75a257',
      style: null,
      blocks: ['columns-image-text'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Company Stats',
      selector: '#backgroundcontainer-b2a702bbb9',
      style: 'grey',
      blocks: ['cards-feature'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Annual Reports Banner',
      selector: '.irbanner',
      style: null,
      blocks: ['hero-parallax'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Re-organisation Content',
      selector: '#backgroundcontainer-2f8f1b7953',
      style: 'grey',
      blocks: [],
      defaultContent: ['.cmp-contentfragment--re-organisation-of-olam h3', '.cmp-contentfragment__elements p', '.button-wrapper a']
    },
    {
      id: 'section-6',
      name: 'Feature Cards',
      selector: '#backgroundcontainer-8f91257696',
      style: null,
      blocks: ['cards-feature'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: 'Latest News',
      selector: '#backgroundcontainer-3e14c971d3',
      style: 'grey',
      blocks: ['cards-feature'],
      defaultContent: ['.richtext-theme h2']
    },
    {
      id: 'section-8',
      name: 'Newsletter Subscribe',
      selector: '.notification',
      style: 'dark',
      blocks: [],
      defaultContent: ['.notification__content h2', '.notification__action a']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
