/* eslint-disable */
/* global WebImporter */

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    WebImporter.DOMUtils.remove(element, [
      '#CybotCookiebotDialog',
      '.subscribe-modal',
      '#formSubscribeModal',
    ]);
  }

  if (hookName === 'afterTransform') {
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--utility-menu',
      '.cmp-experiencefragment--header',
      '.utilitynav',
      '.utility-nav',
      '.utility-nav-mobile',
      'header',
      'nav',
      '.cmp-experiencefragment--footer',
      '.footer-container',
      'footer',
      'aside',
      'iframe',
      'noscript',
      '.slick-cloned',
    ]);
  }
}
