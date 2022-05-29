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
  --le: "le-monde-livre-std", serif;
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
.mt {
  margin-top: 10rem;
}
.mtb {
  margin-top: 15rem;
}
/* 3rd party */
.hamburger-react {
  z-index: 200;
}
.title-slug--markdown {
  margin-top: 2.4rem;
  align-self: flex-start;
  font-family: var(--le);
}
.title-slug--markdown p,
.title-slug--markdown li {
  margin-bottom: 2.4rem;
  font-size: 1.8rem;
  line-height: 1.5;
}
.title-slug--markdown li {
  margin-left: 2rem;
}
.title-slug--markdown p:first-of-type:first-letter {
  font-size: 2.8rem;
  font-weight: 600;
}
.title-slug--markdown h2 {
  font-size: 2.6rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
.title-slug--markdown a {
  text-decoration: underline;
  text-decoration-color: var(--gold);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.title-slug--markdown a:hover {
  color: var(--gold);
}
.title-slug--markdown ul {
  list-style: unset;
}
.overflow-hidden {
  overflow-y: hidden;
}

@media (min-width: 768px) {
.hamburger-react {
  display: none;
  }
.spacer {
  padding: 0 4.2rem 0;
  }
}
@media (min-width: 1024px) {
  .title-slug--markdown p,
  .title-slug--markdown li {
    font-size: 2rem;
  }
  .title-slug--markdown h2 {
    font-size: 3.2rem;
  }
}
@media (min-width: 1360px) {
.spacer {
  padding: 0 5.2rem 0;
  max-width: 160.4rem;
  }
  .mtb {
  margin-top: 25rem;
  }
}
@media (min-width: 1600px) {
  .mt {
    margin-top: 15rem;
  }
}
`;
