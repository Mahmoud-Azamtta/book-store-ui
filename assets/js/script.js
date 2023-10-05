const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");
const scrollUp = document.querySelector(".navbar .scroll-up");
const navbarLogo = document.querySelector(".navbar .img-container");
// const navbarWrapper
const navbarHeight = navbar.offsetHeight;
window.addEventListener("scroll", () => {
    if (screen.width > 992) {
        if (window.scrollY > navbar.offsetTop) {
            navbar.classList.add("fixed-top", "z-2", "border-bottom");
            navbar.classList.remove("my-2");
            header.style.marginTop = `${navbarHeight}px`;
            scrollUp.classList.add("d-flex");
            scrollUp.classList.remove("d-none");
            navbarLogo.classList.add("d-flex");
            navbarLogo.classList.remove("d-none");
            navbarLogo.style.opacity = 1;
            scrollUp.style.opacity = 1;
        }
        if (window.scrollY <= (header.offsetTop)) {
            navbar.classList.remove("fixed-top", "z-2", "border-bottom");
            navbar.classList.add("my-2");
            header.style.marginTop = 0;
            scrollUp.classList.remove("d-flex");
            scrollUp.classList.add("d-none");
            navbarLogo.classList.remove("d-flex");
            navbarLogo.classList.add("d-none");
            navbarLogo.style.opacity = 0;
            scrollUp.style.opacity = 0;
        }
    } 
    else {
        scrollUp.classList.remove("d-flex");
        scrollUp.classList.add("d-none");
        navbarLogo.classList.remove("d-flex");
        navbarLogo.classList.add("d-none");
    }
});

scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const loading = document.querySelector(".loading");
const loader = document.querySelector(".loading .loader");
window.addEventListener("load", () => {
    setTimeout(() => {
        loading.classList.add("opacity-0", "invisible");
        loader.style.display = "none";
        document.body.style.overflow = "auto";
    }, 1000);
});

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

const feedback = document.querySelector(".feedback .content");
const feedbackContainer = document.querySelector(".trends");
window.addEventListener("scroll", () => {
    if (window.scrollY > feedbackContainer.offsetTop + 200) {
        feedback.style.transform = "translateX(0)";
    }
    else {
        feedback.style.transform = "translateX(-1000px)";
    }
});

const trendsSwiper = new Swiper(".trends .swiper", {
    slidesPerView: 1.15, 
    grapCursor: true,
    loop: true,
    breakpoints: {
        1100: {
            slidesPerView: 2.30
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