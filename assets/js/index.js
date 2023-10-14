import { functions } from "./bookoryScripts.js";

const {
    loadPage,
    navbarBehavior,
    scrollTop,
} = functions;

const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");
const scrollUp = document.querySelector(".navbar .scroll-up");
const feedback = document.querySelector(".feedback .content");
const feedbackContainer = document.querySelector(".trends");

let navbarPosition;

const bestsellingSwiper = new Swiper(".bestselling .swiper", {
    slidesPerView: 2,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    breakpoints: {
        575: {
            slidesPerView: 3.5
        },
        1200: {
            slidesPerView: 4.5
        }
    }
});
const trendsSwiper = new Swiper(".trends .swiper", {
    slidesPerView: 1.15, 
    grapCursor: true,
    loop: true,
    centeredSlides: false,
    breakpoints: {
        400: {
            slidesPerView: 1.30
        },
        700: {
            slidesPerView: 2.30
        },
        1650: {
            slidesPerView: 3.30
        }
    }
});
const genreSwiper = new Swiper(".genres .swiper-content", {
    slidesPerView: 1, 
    spaceBetween: 24,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        575: {
            slidesPerView: 1,
            loop: true
        },
        900: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
});

window.addEventListener("scroll", () => {
    navbarBehavior(header, navbarPosition);
});

window.addEventListener("load", () => {
    loadPage();
    navbarPosition = navbar.offsetTop;
});

scrollUp.addEventListener("click", scrollTop);


window.addEventListener("scroll", () => {
    if (window.scrollY > feedbackContainer.offsetTop + 200) {
        feedback.style.transform = "translateX(0)";
    }
    else {
        feedback.style.transform = "translateX(-1000px)";
    }
});
