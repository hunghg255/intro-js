const DEFAULT_OPTIONS = {
  steps: [],
  isStart: true,
};

const SPACE = 20;
const TOOLTIP_WIDTH = 320;
const TIME_30_DAYS = 30 * 24 * 60 * 60 * 1000;

function getOffsetElement(el) {
  if (!el) {
    return {
      left: 0,
      top: 0,
    };
  }

  const rect = el.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  return {
    top: rect.top - bodyRect.top + 8,
    left: rect.left,
  };
}

function getWidthElement(el) {
  let _width = el.offsetWidth;
  const style = el.currentStyle || getComputedStyle(el);

  _width += parseInt(style.marginLeft, 10) || 0;
  return _width;
}

function getHeightElement(el) {
  let _height = el.offsetHeight;
  const style = el.currentStyle || getComputedStyle(el);

  _height += parseInt(style.marginLeft, 10) || 0;
  return _height;
}

const scrollToElement = (element) => {
  const elementPosition = element.getBoundingClientRect().top - 140;
  const startPosition = window.pageYOffset;
  let startTime = 0;
  const duration = 300;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    const run = easeInOutSine(
      timeElapsed,
      startPosition,
      elementPosition,
      duration
    );
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animate);
  }

  function easeInOutSine(t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  }

  requestAnimationFrame(animate);
};

class IntroJs {
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
      let time = localStorage.getItem('J-time');
      const currentTime = new Date().getTime();

      if (!time || currentTime - time > TIME_30_DAYS) {
        localStorage.setItem('J-time', currentTime);
        this.start();
      }
    }
  }

  start() {
    if (!this.steps.length) return;
    this.defineElementMask();
    this.defineElementGlass();

    this.runStep();
    this.initEvent();
  }

  finish = () => {
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
    window.removeEventListener('resize', this.runStep);
  };

  runStep = () => {
    this.stepActive = this.steps[this.currentStep];

    const elementStepActive = document.querySelector('.intro-element-focus');
    if (elementStepActive && this.currentStep !== 0)
      elementStepActive.classList.remove('intro-element-focus');

    const nextStep = document.querySelector(this.stepActive.element);

    if (nextStep) {
      nextStep.classList.add('intro-element-focus');
      const offsetEle = getOffsetElement(nextStep);
      const width = getWidthElement(nextStep);
      const height = getHeightElement(nextStep);

      this.elementGlass.style.width = `${width + 12}px`;
      this.elementGlass.style.height = `${height + 12}px`;
      this.elementGlass.style.top = `${offsetEle.top - 6}px`;
      this.elementGlass.style.left = `${offsetEle.left - 6}px`;

      this.defineTooltip({
        offsetEle,
        width,
        height,
      });
      this.updateDotsActive();
    }
  };

  initEvent() {
    if (!this.elementPrev)
      this.elementPrev = document.querySelector('.intro-btn-prev');
    if (!this.elementNext)
      this.elementNext = document.querySelector('.intro-btn-next');

    this.elementNext.addEventListener('click', this.handleNextStep);
    this.elementPrev.addEventListener('click', this.handlePrevStep);

    window.addEventListener('resize', this.runStep);

    this.elementMask.addEventListener('click', this.finish);

    this.elementGlass.addEventListener('transitionend', () => {
      scrollToElement(this.elementGlass);
    });
  }

  handleNextStep = () => {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep = this.currentStep + 1;
      this.runStep();
      return;
    }
    this.finish();
  };

  handlePrevStep = () => {
    if (this.currentStep > 0) {
      this.currentStep = this.currentStep - 1;
      this.runStep();
    }
  };

  updateDotsActive() {
    const elementDotWrap = document.querySelector('.intro-dots');

    elementDotWrap.innerHTML = this.steps
      .map(
        (_, idx) =>
          `<div class="${this.currentStep === idx ? 'active' : ''}"></div>`
      )
      .join('');
  }

  getPositionOfTooltip({ offsetEle, width, height }) {
    const widthTooltip = TOOLTIP_WIDTH;
    const heightTooltip = getHeightElement(this.elementTooltip);
    if (window.innerWidth - (offsetEle.left + width) > widthTooltip) {
      return {
        topTooltip: offsetEle.top,
        leftTooltip: offsetEle.left + width + SPACE,
      };
    }
    if (offsetEle.left > widthTooltip) {
      return {
        topTooltip: offsetEle.top,
        leftTooltip: offsetEle.left - widthTooltip - SPACE,
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
        topTooltip: offsetEle.top - heightTooltip - SPACE,
        leftTooltip: offsetEle.left,
      };
    }

    return {
      topTooltip: offsetEle.top,
      leftTooltip: offsetEle.left,
    };
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
      <div class="intro-btns">
      <button class="intro-btn-prev">Prev</button>
      <div class="intro-dots"></div>
      <button class="intro-btn-next">Next</button>
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

export default IntroJs;
