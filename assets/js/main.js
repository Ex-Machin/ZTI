"use strict";

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

const on = (type, el, listener, all = false) => {
  const selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

const initPortfolio = () => {
  const portfolioContainer = select("#portfolio-grid");
  if (portfolioContainer) {
    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".item",
    });

    const portfolioFilters = select("#filters a", true);

    on("click", "#filters a", function (e) {
      e.preventDefault();
      portfolioFilters.forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");

      portfolioIsotope.arrange({
        filter: this.getAttribute("data-filter"),
      });
      portfolioIsotope.on("arrangeComplete", () => {
        AOS.refresh();
      });
    }, true);
  }
};

const initAOS = () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
};

const initBurgerMenu = () => {
  const burgerMenu = select(".burger");
  on("click", ".burger", function (e) {
    burgerMenu.classList.toggle("active");
  });
};

const init = () => {
  initPortfolio();
  initAOS();
  initBurgerMenu();
};

window.addEventListener("load", init);
