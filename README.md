# Intro for page

[![npm version](https://badge.fury.io/js/intro-js.svg)](https://badge.fury.io/js/intro-js) [![npm](https://img.shields.io/npm/dw/intro-js.svg?logo=npm)](https://www.npmjs.com/package/intro-js) [![npm](https://img.shields.io/bundlephobia/minzip/intro-js)](https://www.npmjs.com/package/intro-js)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

[Live Demo](https://hunghg255.github.io/intro-js/demo/index.html)

## Installation

[![NPM](https://nodei.co/npm/intro-js.png?compact=true)](https://nodei.co/npm/intro-js/)

#### To install the latest stable version:

```
npm install --save intro-js

or

yarn add intro-js
```

#### Basic usage:

```css
@import 'intro-js/dist/styles.css';
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
