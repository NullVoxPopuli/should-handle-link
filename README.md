# should-handle-link

A utility to help libraries and frameworks handle `<a>` clicks, properly handling all the default behavior that comes with clicking links (ctrl+click, cmd+click, etc).

This allows folks to usue a single event listener on the document to handle all the links in their app.


## Installation

```bash
pnpm add should-handle-link
```

## Usage

```js
import { shouldHandle, getAnchor } from 'should-handle-link';

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
```

## License 

MIT

## Related projects 

- [internal-nav-helper](https://github.com/HenrikJoreteg/internal-nav-helper)
    This porject has narrower scope and doesn't cover as many use cases (and is also outdated).
