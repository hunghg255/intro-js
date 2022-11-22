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
const SPACE = 20;

class Introjs {
  steps;
  isStart;
  elementMask;
  elementGlass;
  currentStep = 0;
  stepActive;
  elementNext;
  elementPrev;
  elementTooltip;

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

    const elementStepActive = document.querySelector('.intro-element-focus');
    if (elementStepActive && this.currentStep !== 0)
      elementStepActive.classList.remove('intro-element-focus');

    const nextStep = document.querySelector(this.stepActive.element);

    if (nextStep) {
      nextStep.classList.add('intro-element-focus');
      const offsetEle = offset(nextStep);
      const width = outerWidth(nextStep);
      const height = outerHeight(nextStep);

      this.elementGlass.style.width = `${width + 12}px`;
      this.elementGlass.style.height = `${height + 12}px`;
      this.elementGlass.style.top = `${offsetEle.top - 6}px`;
      this.elementGlass.style.left = `${offsetEle.left - 6}px`;

      this.defineTooltip({
        offsetEle,
        width,
        height,
      });
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
        return;
      }
      this.finish();
    });
    this.elementPrev.addEventListener('click', () => {
      if (this.currentStep > 0) {
        this.currentStep = this.currentStep - 1;
        this.runStep();
      }
    });

    window.addEventListener('resize', this.runStep.bind(this));

    this.elementMask.addEventListener('click', this.finish.bind(this));
  }

  finish() {
    this.elementTooltip.remove();
    this.elementGlass.remove();
    this.elementMask.remove();
    const elementStepActive = document.querySelector('.intro-element-focus');

    if (elementStepActive)
      elementStepActive.classList.remove('intro-element-focus');

    this.elementMask = null;
    this.elementGlass = null;
    this.currentStep = 0;
    this.stepActive = null;
    this.elementNext = null;
    this.elementPrev = null;
    this.elementTooltip = null;
  }

  defineTooltip({ offsetEle, width, height }) {
    this.elementTooltip = document.querySelector('.intro-tooltip');

    if (!this.elementTooltip) {
      const div = document.createElement('div');
      div.classList.add('intro-tooltip');
      div.insertAdjacentHTML(
        'beforeend',
        `
      <div class="intro-tooltip-content"></div>
      <div>
        <button class="intro-btn-prev">Next</button>
        <button class="intro-btn-next">Prev</button>
      </div>
    `
      );
      document.body.appendChild(div);
      this.elementTooltip = document.querySelector('.intro-tooltip');
    }

    const elementTooltipContent = this.elementTooltip.querySelector(
      '.intro-tooltip-content'
    );
    if (elementTooltipContent)
      elementTooltipContent.innerHTML = this.stepActive.children;

    const { topTooltip, leftTooltip } = this.getPositionOfTooltip({
      offsetEle,
      width,
      height,
    });

    this.elementTooltip.style.top = `${topTooltip}px`;
    this.elementTooltip.style.left = `${leftTooltip}px`;
  }

  getPositionOfTooltip({ offsetEle, width, height }) {
    const widthTooltip = outerWidth(this.elementTooltip);
    const heightTooltip = outerHeight(this.elementTooltip);
    if (window.innerWidth - (offsetEle.left + width) > widthTooltip) {
      return {
        topTooltip: offsetEle.top,
        leftTooltip: offsetEle.left + width + SPACE,
      };
    }

    if (offsetEle.left > widthTooltip) {
      return {
        topTooltip: offsetEle.top,
        leftTooltip: offsetEle.left - width - SPACE,
      };
    }

    if (window.innerHeight - (offsetEle.top + height) > heightTooltip) {
      return {
        topTooltip: offsetEle.top + height + SPACE,
        leftTooltip: offsetEle.left,
      };
    }

    if (offsetEle.top > heightTooltip) {
      return {
        topTooltip: offsetEle.top - height - SPACE,
        leftTooltip: offsetEle.left,
      };
    }

    return {
      topTooltip: offsetEle.top,
      leftTooltip: offsetEle.left,
    };
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
    ];
    const instante = new Introjs({
      steps,
    });
  },
  false
);
