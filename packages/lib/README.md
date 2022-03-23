# Core Library

This is your core library, meaning anything that you can re-use between packages
should be put inside this library.

1. for example a password validation function (can be used both in the api's, app's or web's)
2. Your models, interfaces and types you can see examples at `src/interfaces` or `src/utils`

## Notes

If you happen to have multiple web projects that require web-specific utilities
you can create a specific CoreWeb Library. Example:

```tree
|- package.json
|- .npmrc
|- pnpm-workspace.yaml
|- packages
    |- lib
    |- api_1
    |- app_1
    |- web_1
    |- web_2
```

```javascript

// packages/web_1/package.json
{
  "name": "@monosample/web_1",
  "private": true,
  // ...
  "dependencies": {
    // ...
    "@monosample/lib": "workspace:1.0.0",
    "@monosample/api_1": "0.2.0"
    // ...
  }
  // ...
}
// packages/web_2/package.json
{
  "name": "@monosample/web_2",
  "private": true,
  // ...
  "dependencies": {
    // ...
    "@monosample/lib": "workspace:1.0.0",
    "@monosample/app_1": "0.2.0"
    // ...
  }
  // ...
}
```

```typescript
// packages/app_1/src/dom/dom-helpers.ts
import { IUserOptions, getFullProfileStr } from '@monosample/lib'
const hasNode = selector => !!document.querySelector(selector);
const replaceElement = (selector: string | HTMLElement, user: IUserOptions, replacement: HTMLElement) => {
  let element: HTMLElement;
  if(typeof selector === 'string') {
    element = = document.querySelector(selector);
  } else {
    element = selector;
  }
  replacement.innerText = getFullProfileStr(user);
  // do some logic/check about what you're going to do
  element.replaceWith(replacement);
};
```

### Somewhere inside web_1

```ts
import { IUserOptions } from "@monosample/lib";
import { replaceElement } from "@monosample/api_1";

export class MyView {
  replaceMe: HTMLElement = null;
  user: IUserOptions = null;

  constructor() {
    this.user = JSON.parse(localStorage.getItem("current_user"));
  }

  attached() {
    const el = document.createElement("span");
    // when attached is called, replaceMe is already available on the DOM and on the class
    replaceElement(this.replaceMe, this.user, el);
  }
}
```

### Somewhere inside web_2

```html
<template>
  <!-- Some template -->
</template>
<script>
  import { IUserOptions } from "@monosample/lib";
  import { replaceElement } from "@monosample/app_1";
  export default {
    name: "SomeView",
    data() {
      // ...
    },
    mounted() {
      const user = JSON.parse(localStorage.getItem("current_user"));
      const replaceme = this.$refs["replaceMe"];
      const el = document.createElement("span");
      replaceElement(replaceme, user, el);
    },
  };
</script>
```

The same can be applied to back-end only libraries, while the example is trivial
and there are better ways to replace DOM elements in each specific framework, this
just serves to show a possible idea on how could you accomplish a Front-end only library
a Back-end only library would of course be tied to nodejs specific dependencies,
like database/files manipulation, networking etc.
