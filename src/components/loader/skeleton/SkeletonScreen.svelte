<style lang="scss" global>
  /* Variables */
  $skeleton-element-color: rgba(0, 0, 0, 0.17) !default;

  $skeleton-loading-animation-time: 1.3s !default;

  $skeleton-margin-standart: 16px !default;
  $skeleton-margin-small: $skeleton-margin-standart / 2 !default;

  $skeleton-card-box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.17) !default;
  $skeleton-card-background-color: #ffffff !default;
  $skeleton-card-border-radius: 5px !default;

  $skeleton-circle-size: 50px !default;

  $skeleton-hr-height: 2px !default;

  $skeleton-line-border-radius: 5px !default;
  $skeleton-line-height: 12px !default;
  $skeleton-line-margin-bottom: 8px !default;

  $skeleton-box-border-radius: 5px !default;
  $skeleton-box-height: 30px !default;
  $skeleton-box-margin-bottom: 8px !default;

  $skeleton-headline-height: $skeleton-line-height * 2 !default;

  $skeleton-square-height: 150px !default;

  /* Animation */
  @keyframes ssc-loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  /* Animation partial */
  %ssc-animation {
    position: relative;
    overflow: hidden;

    &:after {
      content: "";
      animation: ssc-loading $skeleton-loading-animation-time infinite;
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(-100%);
      z-index: 1;
      background: linear-gradient(90deg, transparent, hsla(0, 0%, 100%, 0.3), transparent);
    }
  }

  /** Main class */
  .ssc-container {
    cursor: progress;
    user-select: none;
    height: 100%;
    overflow: hidden;
  }

  /** Helpers classes */
  .ssc-container {
    .mb {
      margin-bottom: $skeleton-margin-standart;
    }

    .mt {
      margin-top: $skeleton-margin-standart;
    }

    .mr {
      margin-right: $skeleton-margin-standart;
    }

    .ml {
      margin-left: $skeleton-margin-standart;
    }

    .mbs {
      margin-bottom: $skeleton-margin-small;
    }

    .mts {
      margin-top: $skeleton-margin-small;
    }

    .mrs {
      margin-right: $skeleton-margin-small;
    }

    .mls {
      margin-left: $skeleton-margin-small;
    }

    .w-10 {
      width: 10%;
    }

    .w-20 {
      width: 20%;
    }

    .w-30 {
      width: 30%;
    }

    .w-40 {
      width: 40%;
    }

    .w-50 {
      width: 50%;
    }

    .w-60 {
      width: 60%;
    }

    .w-70 {
      width: 70%;
    }

    .w-80 {
      width: 80%;
    }

    .w-90 {
      width: 90%;
    }

    .w-100 {
      width: 100%;
    }

    .flex {
      display: flex;
    }

    .inline-flex {
      display: inline-flex;
    }

    .align-center {
      align-items: center;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-stretch {
      align-items: stretch;
    }

    .justify-start {
      justify-content: start;
    }

    .justify-end {
      justify-content: end;
    }
    .justify-between {
      justify-content: space-between;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-around {
      justify-content: space-around;
    }
  }

  /** Wrapper class */
  .ssc-wrapper {
    padding: $skeleton-margin-standart;
  }

  /* Figures, Objects */
  .ssc-card {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: $skeleton-card-border-radius;
    box-shadow: $skeleton-card-box-shadow;
    background-color: $skeleton-card-background-color;
  }

  .ssc-circle {
    display: block;
    background-color: $skeleton-element-color;
    border-radius: 50%;
    width: $skeleton-circle-size;
    height: $skeleton-circle-size;

    @extend %ssc-animation;
  }

  .ssc-hr {
    display: block;
    width: 100%;
    background-color: $skeleton-element-color;
    height: $skeleton-hr-height;
  }

  .ssc-line {
    display: block;
    background-color: $skeleton-element-color;
    border-radius: $skeleton-line-border-radius;
    margin-bottom: $skeleton-line-margin-bottom;
    width: 100%;
    height: $skeleton-line-height;

    &:last-child {
      margin-bottom: unset;
    }

    @extend %ssc-animation;
  }

  .ssc-box {
    display: block;
    background-color: $skeleton-element-color;
    border-radius: $skeleton-box-border-radius;
    margin-bottom: $skeleton-box-margin-bottom;
    width: 100%;
    height: $skeleton-box-height;

    &:last-child {
      margin-bottom: unset;
    }

    @extend %ssc-animation;
  }

  .ssc-head-line {
    display: block;
    background-color: $skeleton-element-color;
    border-radius: $skeleton-line-border-radius;
    width: 100%;
    height: $skeleton-headline-height;

    @extend %ssc-animation;
  }

  .ssc-square {
    display: block;
    background-color: $skeleton-element-color;
    width: 100%;
    height: $skeleton-square-height;

    @extend %ssc-animation;
  }

</style>

<div class="ssc-container">
  <slot />
</div>
