const DEFAULT_OPTIONS = {
  steps: [],
  isStart: true,
};

function offset(el) {
  if (!el) {
    return {
      left: 0,
      top: 0,
    };
  }

  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}

function outerWidth(el) {
  let _width = el.offsetWidth;
  const style = el.currentStyle || getComputedStyle(el);

  _width += parseInt(style.marginLeft, 10) || 0;
  return _width;
}

function outerHeight(el) {
  let _height = el.offsetHeight;
  const style = el.currentStyle || getComputedStyle(el);

  _height += parseInt(style.marginLeft, 10) || 0;
  return _height;
}

class Introjs {
  steps;
  isStart;
  elementMask;
  elementGlass;
  currentStep = 0;
  stepActive;
  elementNext;
  elementPrev;

  constructor(options = {}) {
    this.setOptions(options);

    this.init();
  }

  init() {
    if (this.isStart) {
      this.start();
    }
  }

  start() {
    if (!this.steps.length) return;
    this.defineElementMask();
    this.defineElementGlass();

    this.runStep();
    this.actions();
  }

  runStep() {
    this.stepActive = this.steps[this.currentStep];
    console.log(this.stepActive);

    const elementStepActive = document.querySelector('.intro-element-focus');
    if (elementStepActive && this.currentStep !== 0)
      elementStepActive.classList.remove('intro-element-focus');

    const nextStep = document.querySelector(this.stepActive.element);

    if (nextStep) {
      nextStep.classList.add('intro-element-focus');
      console.log(nextStep);
      const offsetEle = offset(nextStep);
      const width = outerWidth(nextStep);
      const height = outerHeight(nextStep);
      console.log({
        width,
        height,
      });
      this.elementGlass.style.width = `${width}px`;
      this.elementGlass.style.height = `${height}px`;
      this.elementGlass.style.top = `${offsetEle.top}px`;
      this.elementGlass.style.left = `${offsetEle.left}px`;
    }
  }

  actions() {
    if (!this.elementPrev)
      this.elementPrev = document.querySelector('.intro-btn-prev');
    if (!this.elementNext)
      this.elementNext = document.querySelector('.intro-btn-next');

    this.elementNext.addEventListener('click', () => {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep = this.currentStep + 1;
        this.runStep();
      }
    });
  }

  defineElementMask() {
    this.elementMask = document.querySelector('.intro-mask');
    if (!this.elementMask) {
      const div = document.createElement('div');
      div.classList.add('intro-mask');
      document.body.appendChild(div);
      this.elementMask = document.querySelector('.intro-mask');
    }
  }

  defineElementGlass() {
    this.elementGlass = document.querySelector('.intro-glass-focus');
    if (!this.elementGlass) {
      const div = document.createElement('div');
      div.classList.add('intro-glass-focus');
      document.body.appendChild(div);
      this.elementGlass = document.querySelector('.intro-glass-focus');
    }
  }

  setOptions(options) {
    const objMerge = { ...DEFAULT_OPTIONS, ...options };
    this.steps = objMerge.steps;
    this.isStart = objMerge.isStart;
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const steps = [
      {
        element: '.title',
        children: 'Title',
      },
      {
        element: '.second',
        children: 'Title',
      },
      {
        element: '.three',
        children: 'Title',
      },
    ];
    const instante = new Introjs({
      steps,
    });
  },
  false
);
