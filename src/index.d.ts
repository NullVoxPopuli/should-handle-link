/**
 * Returns `true` if the link should be handled by the Ember router
 * Returns `false` if the link should be handled by the browser
 */
export function shouldHandle(
  href: string,
  element: HTMLAnchorElement,
  event: MouseEvent,
  ignore?: (string | RegExp)[],
): boolean;

/**
 * For a given event, this will return the HTMLAnchorElement
 * that was clicked within. This is so that you can easily grab the `href`
 * attribute without needing to grab it yourself.
 *
 * This plays nicely with event delegation patterns where you have a
 * more central event listener.
 */
export function getAnchor(event: Event): HTMLAnchorElement | undefined;
