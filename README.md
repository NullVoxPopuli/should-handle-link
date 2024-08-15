# should-handle-link

A utility to help libraries and frameworks handle `<a>` clicks, properly handling all the default behavior that comes with clicking links (ctrl+click, cmd+click, etc).

This allows folks to usue a single event listener on the document to handle all the links in their app.


## Installation

```bash
pnpm add should-handle-link
```

## Usage

```js
import { shouldHandle } from 'should-handle-link';

function handler(event) {
    let anchor = getAnchor(event);

    if (!shouldHandle(location.href, anchor, event)) {
        return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    // Do single-page-app routing, 
    // or some other manual handling of the clicked anchor element
}

document.body.addEventListener('click', handler);

function getAnchor(event) {
  let composedPath = event.composedPath();

  for (let element of composedPath) {
    if (element instanceof HTMLAnchorElement) {
      return element;
    }
  }
}

```