var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero-banner.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".slick-slide:not(.slick-cloned)");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".olam-banner__image-container img, picture img");
      const title = slide.querySelector(".olam-banner__title, h1");
      const primaryBtn = slide.querySelector(".olam-banner__action-btn--primary, .primary-button");
      const secondaryBtn = slide.querySelector(".olam-banner__action-btn--tertiary, .tertiary-button");
      const imageCell = document.createElement("div");
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        imageCell.appendChild(newImg);
      }
      const contentCell = document.createElement("div");
      if (title) {
        const h = document.createElement("h1");
        h.textContent = title.textContent.trim();
        contentCell.appendChild(h);
      }
      if (primaryBtn) {
        const a = document.createElement("a");
        a.href = primaryBtn.href;
        a.textContent = primaryBtn.textContent.trim();
        contentCell.appendChild(a);
      }
      if (secondaryBtn) {
        const a = document.createElement("a");
        a.href = secondaryBtn.href;
        a.textContent = secondaryBtn.textContent.trim();
        contentCell.appendChild(a);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-image-text.js
  function parse2(element, { document }) {
    const img = element.querySelector(".olam-textandimage__img img, img");
    const heading = element.querySelector(".olam-textandimage__content-title h2, h2");
    const desc = element.querySelector(".olam-textandimage__content-description p, .olam-textandimage__content-description");
    const cta = element.querySelector(".olam-textandimage__content-action a, .primary-button");
    const imageCell = document.createElement("div");
    if (img) {
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      imageCell.appendChild(newImg);
    }
    const contentCell = document.createElement("div");
    if (heading) {
      const h = document.createElement("h2");
      h.textContent = heading.textContent.trim();
      contentCell.appendChild(h);
    }
    if (desc) {
      const p = document.createElement("p");
      p.textContent = desc.textContent.trim();
      contentCell.appendChild(p);
    }
    if (cta) {
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      contentCell.appendChild(a);
    }
    const cells = [[imageCell, contentCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-image-text", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse3(element, { document }) {
    const cells = [];
    if (element.classList.contains("large-icon-banner")) {
      const icons = element.querySelectorAll(".large-icon-banner__img img");
      icons.forEach((img) => {
        const imageCell = document.createElement("div");
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        imageCell.appendChild(newImg);
        cells.push([imageCell]);
      });
      const summary = element.querySelector(".large-icon-banner__summary p");
      const cta = element.querySelector(".large-icon-banner__action a, .primary-button");
      if (summary || cta) {
        const textCell = document.createElement("div");
        if (summary) {
          const p = document.createElement("p");
          p.textContent = summary.textContent.trim();
          textCell.appendChild(p);
        }
        if (cta) {
          const a = document.createElement("a");
          a.href = cta.href;
          a.textContent = cta.textContent.trim();
          textCell.appendChild(a);
        }
        cells.push([textCell]);
      }
    } else if (element.querySelector(".card-box-container")) {
      const img = element.querySelector("img.more-img, img");
      const heading = element.querySelector(".card-header, h3");
      const desc = element.querySelector(".card-description p, .card-description");
      const cta = element.querySelector(".card-action-container a, .primary-button");
      const imageCell = document.createElement("div");
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        imageCell.appendChild(newImg);
      }
      const contentCell = document.createElement("div");
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        contentCell.appendChild(h);
      }
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        contentCell.appendChild(p);
      }
      if (cta) {
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        contentCell.appendChild(a);
      }
      cells.push([imageCell, contentCell]);
    } else if (element.classList.contains("olam-related-article")) {
      const articles = element.querySelectorAll(".slick-slide:not(.slick-cloned) .olam-related-article__item");
      articles.forEach((article) => {
        const tag = article.querySelector(".tag");
        const date = article.querySelector(".olam-related-article__date");
        const title = article.querySelector(".olam-related-article__item-title, h4");
        const desc = article.querySelector(".olam-related-article__item-description");
        const link = article.querySelector(".olam-related-article__action-btn a");
        const contentCell = document.createElement("div");
        if (tag) {
          const em = document.createElement("em");
          em.textContent = tag.textContent.trim();
          contentCell.appendChild(em);
        }
        if (date) {
          const small = document.createElement("p");
          small.textContent = date.textContent.trim();
          contentCell.appendChild(small);
        }
        if (title) {
          const h = document.createElement("h4");
          h.textContent = title.textContent.trim();
          contentCell.appendChild(h);
        }
        if (desc) {
          const p = document.createElement("p");
          p.textContent = desc.textContent.trim().substring(0, 200) + "...";
          contentCell.appendChild(p);
        }
        if (link) {
          const a = document.createElement("a");
          a.href = link.href;
          a.textContent = link.textContent.trim();
          contentCell.appendChild(a);
        }
        cells.push([contentCell]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-parallax.js
  function parse4(element, { document }) {
    const img = element.querySelector("img");
    const title = element.querySelector(".olam-image-banner__title");
    const desc = element.querySelector(".olam-image-banner__desc p, .olam-image-banner__desc");
    const cta = element.querySelector(".olam-image-banner__cta a, .primary-button");
    const cells = [];
    if (img) {
      const imageCell = document.createElement("div");
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      imageCell.appendChild(newImg);
      cells.push([imageCell]);
    }
    const contentCell = document.createElement("div");
    if (title) {
      const h = document.createElement("h2");
      h.textContent = title.textContent.trim();
      contentCell.appendChild(h);
    }
    if (desc) {
      const p = document.createElement("p");
      p.textContent = desc.textContent.trim();
      contentCell.appendChild(p);
    }
    if (cta) {
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      contentCell.appendChild(a);
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-parallax", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/olamgroup-cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        "#CybotCookiebotDialog",
        ".subscribe-modal",
        "#formSubscribeModal"
      ]);
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--utility-menu",
        ".cmp-experiencefragment--header",
        ".utilitynav",
        ".utility-nav",
        ".utility-nav-mobile",
        "header",
        "nav",
        ".cmp-experiencefragment--footer",
        ".footer-container",
        "footer",
        "aside",
        "iframe",
        "noscript",
        ".slick-cloned"
      ]);
    }
  }

  // tools/importer/transformers/olamgroup-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero-banner": parse,
    "columns-image-text": parse2,
    "cards-feature": parse3,
    "hero-parallax": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage with hero banner, card sections highlighting business groups, supply chain roles, and awards",
    urls: [
      "https://www.olamgroup.com/"
    ],
    blocks: [
      {
        name: "carousel-hero-banner",
        instances: [".bannercarousel.home-banner .banner_carousel"]
      },
      {
        name: "columns-image-text",
        instances: [".olam-textandimage"]
      },
      {
        name: "cards-feature",
        instances: [".large-icon-banner", ".cardcomponent .card-content-wrapper", ".olam-related-article"]
      },
      {
        name: "hero-parallax",
        instances: [".olam-image-banner.olam-image-banner__desktop"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".bannercarousel.home-banner",
        style: null,
        blocks: ["carousel-hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Re-imagining Agriculture",
        selector: "#backgroundcontainer-f46c75a257",
        style: null,
        blocks: ["columns-image-text"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Company Stats",
        selector: "#backgroundcontainer-b2a702bbb9",
        style: "grey",
        blocks: ["cards-feature"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Annual Reports Banner",
        selector: ".irbanner",
        style: null,
        blocks: ["hero-parallax"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Re-organisation Content",
        selector: "#backgroundcontainer-2f8f1b7953",
        style: "grey",
        blocks: [],
        defaultContent: [".cmp-contentfragment--re-organisation-of-olam h3", ".cmp-contentfragment__elements p", ".button-wrapper a"]
      },
      {
        id: "section-6",
        name: "Feature Cards",
        selector: "#backgroundcontainer-8f91257696",
        style: null,
        blocks: ["cards-feature"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Latest News",
        selector: "#backgroundcontainer-3e14c971d3",
        style: "grey",
        blocks: ["cards-feature"],
        defaultContent: [".richtext-theme h2"]
      },
      {
        id: "section-8",
        name: "Newsletter Subscribe",
        selector: ".notification",
        style: "dark",
        blocks: [],
        defaultContent: [".notification__content h2", ".notification__action a"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
