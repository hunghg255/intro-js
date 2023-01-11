# Intro for page

[![npm version](https://badge.fury.io/js/introh-js.svg)](https://badge.fury.io/js/introh-js) [![npm](https://img.shields.io/npm/dt/introh-js.svg?logo=npm)](https://www.npmjs.com/package/introh-js) [![npm](https://img.shields.io/bundlephobia/minzip/introh-js)](https://www.npmjs.com/package/introh-js)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors-)

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
