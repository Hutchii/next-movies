import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
  --white: #ffffff;
  --darkwhite: #f6f6f6;
  --grey: #8e8e8e;
  --lightgrey: #e8e8e8;
  --black: #161616;
  --gold: #cf9500;
  --red: #DD0035;
  --inter: 'Inter', sans-serif;
  --le: "le-monde-livre-std",serif;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  position: relative;
  background-color: var(--darkwhite);
  overflow-x: hidden;
  color: var(--black);
}

html {
  font-size: 62.5%;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
  color: transparent;
}
:after,
:before {
  content: "";
  position: absolute;
}
.spacer {
  padding: 0 3.2rem 0;
}
.center {
  margin: 0 auto;
}
/* 3rd party */
.hamburger-react {
  z-index: 200;
}
.margin--top {
  margin-top: 10rem;
}

@media (min-width: 768px) {
.hamburger-react {
  display: none;
  }
.spacer {
  padding: 0 4.2rem 0;
  }
}
@media (min-width: 1360px) {
.spacer {
  padding: 0 5.2rem 0;
  max-width: 160.4rem;
  }
}
@media (min-width: 1600px) {
  .margin--top {
    margin-top: 15rem;
  }
}
`;
