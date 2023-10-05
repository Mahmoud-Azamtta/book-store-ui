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