/**
 * Returns `true` if the link should be handled by the Ember router
 * Returns `false` if the link should be handled by the browser
 */
export function shouldHandle(href, element, event, ignore = []) {
  if (!element) return false;
  /**
   * If we don't have an href, the <a> is invalid.
   * If you're debugging your code and end up finding yourself
   * early-returning here, please add an href ;)
   */
  if (!element.href) return false;

  /**
   * This is partially an escape hatch, but any time target is set,
   * we are usually wanting to escape the behavior of single-page-apps.
   *
   * Some folks desire to have in-SPA links, but still do native browser behavior
   * (which for the case of SPAs is a full page refresh)
   * but they can set target="_self" to get that behavior back if they want.
   *
   * I expect that this'll be a super edge case, because the whole goal of
   * "proper links" is to do what is expected, always -- for in-app SPA links
   * as well as external, cross-domain links
   */
  if (element.target) return false;

  /**
   * rel="external" indicates that the hyperlink leads to a resource outside 
   * the site of the current page; that is, following the link will make 
   * the user leave the site.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
   */
  if (element.rel === "external") return false;

  /**
   * Clicking <a href="..." download> should open up browser's download dialog
   */
  if (element.hasAttribute("download")) return false;

  /**
   * If the click is not a "left click" we don't want to intercept the event.
   * This allows folks to
   * - middle click (usually open the link in a new tab)
   * - right click (usually opens the context menu)
   */
  if (event.button !== 0) return false;

  /**
   * for MacOS users, this default behavior opens the link in a new tab
   */
  if (event.metaKey) return false;

  /**
   * for for everyone else, this default behavior opens the link in a new tab
   */
  if (event.ctrlKey) return false;

  /**
   * The default behavior here downloads the link content
   */
  if (event.altKey) return false;

  /**
   * The default behavior here opens the link in a new window
   */
  if (event.shiftKey) return false;

  /**
   * If another event listener called event.preventDefault(), we don't want to proceed.
   */
  if (event.defaultPrevented) return false;

  /**
   * The href includes the protocol/host/etc
   * In order to not have the page look like a full page refresh,
   * we need to chop that "origin" off, and just use the path
   */
  let url = new URL(element.href);
  let location = new URL(href);

  /**
   * If the domains are different, we want to fall back to normal link behavior
   *
   */
  if (location.origin !== url.origin) return false;

  /**
   * Hash-only links are handled by the browser, except for the case where the
   * hash is being removed entirely, e.g. /foo#bar to /foo. In that case the
   * browser will do a full page refresh which is not what we want. Instead
   * we let the router handle such transitions. The current implementation of
   * the Ember router will skip the transition in this case because the path
   * is the same.
   */
  let [prehash, posthash] = url.href.split("#");

  if (posthash !== undefined && prehash === location.href.split("#")[0]) {
    return false;
  }

  /**
   * We can optionally declare some paths as ignored,
   * or "let the browser do its default thing,
   * because there is other server-based routing to worry about"
   */
  if (ignore.includes(url.pathname)) return false;

  return true;
}
