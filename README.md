<p align="center">
<a href="https://www.npmjs.com/package/introh-js" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/bi:bar-chart-steps.svg?color=%23fdb4e2" alt="logo" width='100'/></a>
</p>

<p align="center">
  A library intro for your website
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/introh-js" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/introh-js" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=introh-js" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/introh-js" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/introh-js/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/introh-js/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/introh-js" alt="License" /></a>
</p>

[Live Demo](https://hunghg255.github.io/intro-js/demo/index.html)

## Installation

[![NPM](https://nodei.co/npm/introh-js.png?compact=true)](https://nodei.co/npm/introh-js/)

#### To install the latest stable version:

```
npm install --save introh-js

or

yarn add introh-js
```

#### Basic usage:

```css
@import 'introh-js/dist/styles.css';
```

```ts
interface IIntroJs {
   steps: { element: string; children: string }[];
   isStart?: boolean;
}

new IntroJs(options: IIntroJs);

const steps = [
  {
    element: '.title',
    children: 'Title One',
  },
  {
    element: '.second',
    children: 'Title Two',
  },
  {
    element: '.three',
    children: 'Title Three',
  },
  {
    element: '.cat',
    children: 'Cat',
  },
];
const instante = new IntroJs({
  steps,
});
```
