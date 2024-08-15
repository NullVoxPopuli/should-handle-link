/**
 * Returns `true` if the link should be handled by the Ember router
 * Returns `false` if the link should be handled by the browser
 */
export function shouldHandle(href: string, element: HTMLAnchorElement, event: MouseEvent, ignore?: string[]): boolean;
