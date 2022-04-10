import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
  --white: #ffffff;
  --darkwhite: #f6f6f6;
  --grey: #8e8e8e;
  --lightgrey: #e8e8e8;
  --black: #161616;
  --gold: #cf9500;
  --inter: "Inter", sans-serif;
  --freight: "freight-text-pro", serif;
  --cormorant: 'Cormorant Infant', serif;
  --cabin: 'Cabin', sans-serif;
  --lora: 'Lora', serif;
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
  font-family: var(--freight);
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
/* ::selection {
  background: #cecece;
} */
.spacer {
  padding: 0 3.2rem 0;
  max-width: 178.4rem;
  margin: 0 auto;
}
/* 3rd party */
.hamburger-react {
  z-index: 200;
}

@media (min-width: 768px) {
.hamburger-react {
  display: none;
  }
.spacer {
  padding: 0 4.2rem 0;
  max-width: 180.4rem;
  }
}
@media (min-width: 1024px) {
.spacer {
  padding: 0 4.6rem 0;
  max-width: 181.2rem;
  }
}
@media (min-width: 1440px) {
  .spacer {
    padding: 0 5rem 0;
    max-width: 163.2rem;
  }
}


`;
