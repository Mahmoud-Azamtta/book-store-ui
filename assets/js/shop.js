import { functions } from "./bookoryScripts.js";
import books from "../json/books.json" assert { type: "json" };;

const {
    loadPage,
    navbarBehavior,
    scrollTop,
    buildStarRating
} = functions;


const navbar = document.querySelector(".navbar");
const dropdowns = document.querySelectorAll(".shop-menu .view .dropdown");
const header = document.querySelector(".page-title");
const scrollUp = document.querySelector(".navbar .scroll-up");
const itemsShown = document.querySelectorAll(".items-shown li");
const sortingOptions = document.querySelectorAll(".sorting li");
const showFilters = document.querySelector(".show-filters");
const filtersWrapper = document.querySelector(".filter-options");
const genresList = document.querySelectorAll(".genre-list input");
const authorsList = document.querySelectorAll(".authors-list input");
const priceFilterBtn = document.querySelector(".price-filter-btn");
const minSliderThumb = document.getElementById("min-slider");
const maxSliderThumb = document.getElementById("max-slider");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");
const sliderTrack = document.querySelector(".slider-track");
const minPriceGap = 5;
const maxSliderValue = minSliderThumb.max;

let navbarPosition;
let filterOptionsHeight = 0;
let open = false;
let state = {
    "dataSet": [...books],
    "page": 1,
    "items": 9,
    "maxButtons": 3,
    "sorting" : "default-sort",
    "genres": new Set(),
    "authors": new Set(),
    "minPrice": 0,
    "maxPrice": 200
};

buildList();

showFilters.addEventListener("click", () => {
    if (open) {
        filtersWrapper.style.height = "0px"; 
        open = false;
    }
    else {
        filtersWrapper.style.height = `${filterOptionsHeight - 50}px`;
        open = true;
    }
});

priceFilterBtn.addEventListener("click", () => {
    state.minPrice = minSliderThumb.value;
    state.maxPrice = maxSliderThumb.value;
    buildList();
});

itemsShown.forEach(listItem => {
    listItem.addEventListener("click", () => {
        state.items = listItem.innerHTML;
        buildList();
    });
});

authorsList.forEach(author => {
    author.addEventListener("click", () => {
        if (author.checked)
            state.authors.add(author.value);
        else 
            state.authors.delete(author.value);
        state.page = 1;
        buildList();
    });
});

genresList.forEach(genre => {
    genre.addEventListener("click", () => {
        if (genre.checked)
            state.genres.add(genre.value);
        else 
            state.genres.delete(genre.value);
        state.page = 1;
        buildList();
    });
});

sortingOptions.forEach(option => {
    option.addEventListener("click", () => {
        state.sorting = option.id;
        state.page = 1;
        buildList();
    });
});

function buildList() {
    const listWrapper = document.querySelector(".menu-items > .row");
    state.dataSet = filterData();
    sortBooks();
    let data = pagination(state.dataSet, state.page, state.items);
    let bookList = data.dataSet;
    let items = "";
    for (let i = 0; i < bookList.length; i++) 
        items += createListItem(bookList, i);
    listWrapper.innerHTML = items;
    buildPageButtons(data.pages);
}

function pagination(dataSet, page, items) {
    let trimStart = (page - 1) * items;
    let trimEnd = trimStart + items;
    let trimedData = dataSet.slice(trimStart, trimEnd);
    let pages = Math.ceil(dataSet.length / items);

    return {
        "dataSet": trimedData,
        "pages": pages
    }
}

function filterData() {
    let bookList = [...books];
    if (state.genres.size > 0) {
        let x = filterGenres(state.genres);
        bookList = bookList.filter(element => filterGenres(state.genres).includes(element));
    }
    if (state.authors.size > 0)
        bookList = bookList.filter(element => filterAuthors(state.authors).includes(element));
    bookList = bookList.filter(element => fliterPrice(state.minPrice, state.maxPrice).includes(element));
    return bookList;
}

function filterGenres(selectedGenres) {
    let filteredData = [];
    books.forEach(item => {
        if (selectedGenres.has(item.genre))
            filteredData.push(item);
    });
    return filteredData
}

function filterAuthors(selectedAuthors) {
    let filteredData = [];
    books.forEach(item => {
        if (selectedAuthors.has(item.author))
            filteredData.push(item);
    });
    return filteredData;
}

function fliterPrice(min, max) {
    return books.filter(element => (element.cost >= min && element.cost <= max));
}

function sortBooks() {
    if (state.sorting == "rating-sort")
        state.dataSet.sort((a, b) => b.rating - a.rating);
    else if (state.sorting == "low-to-high") 
        state.dataSet.sort((a, b) => a.cost - b.cost); 
    else if (state.sorting == "high-to-low")
        state.dataSet.sort((a, b) => b.cost - a.cost);
    else 
        state.dataSet = books.filter(element => state.dataSet.includes(element));
}

function createListItem(bookList, idx) {
    let starRating = buildStarRating(bookList[idx].rating);
    let items = `
        <div class="col mt-3 border-end">
            <div class="item book-id="${bookList[idx].bookId}" mt-3">
                <div class="img-container">
                    <a href="item.html?id=${bookList[idx].bookId}"><img src="${bookList[idx].bookCover}" alt="${bookList[idx].bookTitle}"></a>
                </div>
                <div class="book-desc">
                    <a href="item.html?id=${bookList[idx].bookId}" class="d-block mt-3">${bookList[idx].bookTitle}</a>
                    <div class="star-rating my-2">
                        ${starRating}
                    </div>
                    <p class="my-2">${bookList[idx].author}</p>
                    <div class="item-price-cart d-flex justify-content-between align-items-center">
                        <span>$${bookList[idx].cost}</span>
                        <button class="add-item text-white text-center rounded-circle border-0">
                            <span class="add-text d-inline-block rounded-pill px-2 position-absolute">Add to cart</span>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    `;
    return items;
}

function buildPageButtons(pages) {
    let maxLeft = state.page - Math.floor(state.maxButtons / 2);
    let maxRight = state.page + Math.floor(state.maxButtons / 2);
    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.maxButtons;
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.maxButtons - 1);
        maxRight = pages;
        if (maxLeft < 1) 
            maxLeft = 1;
    }
    const pageIndicators = document.querySelector(".page-indicators");
    let buttons = "";
    for (let i = 1; i <= pages; i++) {
        if (i == state.page)
            buttons += `<button value="${i}" class="active-page page-number">${i}</button>`;
        else  
            buttons += `<button value="${i}" class="page-number">${i}</button>`;
    }

    if (state.page != 1) 
        buttons = `<button class="prev text-uppercase px-3 d-flex align-items-center"><i class="fa-solid fa-chevron-left me-1"></i> previous</button>` + buttons;
    if (state.page != pages) 
        buttons += `<button class="next text-uppercase px-3 d-flex align-items-center">next <i class="fa-solid fa-chevron-right ms-1"></i></button`
    pageIndicators.innerHTML = buttons;

    const pageButtons = document.querySelectorAll(".page-indicators button");
    pageButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".menu-items > div").innerHTML = "";
            const menuPosition = document.querySelector(".menu-items").offsetTop;
            if (btn.classList.contains("prev")) 
                state.page--;
            if (btn.classList.contains("next"))
                state.page++;
            if (btn.classList.contains("page-number")) 
                state.page = btn.value;
            window.scrollTo({
                "top": menuPosition - 150,
                "behavior": "smooth"
            });
            buildList();
        });
    });
}

function moveFilterOptions() {
    const sidebarWrapper = document.querySelector(".sidebar-wrapper");
    const filterOptions = document.querySelector(".filter-options > .row");
    let screenWidth = window.innerWidth;
    if (screenWidth < 992) {
        const sidebarElements = document.querySelectorAll(".sidebar-wrapper > div");
        if (sidebarElements.length > 0) {
            sidebarElements[0].classList.add("mt-4");
            sidebarWrapper.classList.add("d-none");
            const leftBar = document.createElement("div");
            const rightBar = document.createElement("div");
            leftBar.classList.add("col-sm-6", "col-12");
            rightBar.classList.add("col-sm-6", "col-12");

            for (let i = 0; i < sidebarElements.length - 1; i++) {
                sidebarElements[i].classList.add("filter-option", "col-12");
                if (i % 2 == 0) 
                    leftBar.appendChild(sidebarElements[i]);
                else 
                    rightBar.appendChild(sidebarElements[i]);
            }
            sidebarElements[sidebarElements.length - 1].classList.add("filter-option", "col-12");
            rightBar.appendChild(sidebarElements[sidebarElements.length - 1]);
            filterOptions.appendChild(leftBar);
            filterOptions.appendChild(rightBar);
            sidebarWrapper.innerHTML = "";
        }
    }
    else {
        const sidebarElements = document.querySelectorAll(".filter-options .filter-option");
        if (sidebarElements.length > 0) {
            sidebarElements[0].classList.remove("mt-4");
            sidebarWrapper.classList.remove("d-none");
            sidebarElements.forEach(element => {
                element.classList.remove("col-md-4", "col-sm-6", "col-12");
                sidebarWrapper.appendChild(element);
            });
            filterOptions.innerHTML = "";
        }
    }
}

function getFiltersHeight() {
    if (window.innerWidth < 992) {
        const imaginaryWrapper = document.createElement("div");
        const body = document.querySelector("body");
        imaginaryWrapper.classList.add("imaginary", "position-absolute", "z-3", "opacity-0");
        imaginaryWrapper.innerHTML = filtersWrapper.innerHTML;
        body.appendChild(imaginaryWrapper);
        filterOptionsHeight = imaginaryWrapper.offsetHeight;
        body.removeChild(imaginaryWrapper);
    }
}

function minSlider() {
    let minValue = parseInt(minSliderThumb.value);  
    let maxValue = parseInt(maxSliderThumb.value);
    if (maxValue - minValue <= minPriceGap) 
        minSliderThumb.value = Math.round(maxValue - minPriceGap);
    minPrice.textContent = Math.round(minSliderThumb.value);
    fillPriceSliderColor();
}

function maxSlider() {
    let minValue = parseInt(minSliderThumb.value);  
    let maxValue = parseInt(maxSliderThumb.value);
    if (maxValue - minValue <= minPriceGap)
        maxSliderThumb.value = Math.round(minValue + minPriceGap);
    maxPrice.textContent = Math.round(maxSliderThumb.value);
    fillPriceSliderColor();
}

function fillPriceSliderColor() {
    let leftPercent = (minSliderThumb.value / maxSliderValue) * 100;
    let rightPercent = (maxSliderThumb.value / maxSliderValue) * 100;
    sliderTrack.style.background = `
        linear-gradient(to right, #ddd ${leftPercent}%, 
            #000 ${leftPercent}%, 
            #000 ${rightPercent}%,
            #ddd ${rightPercent}%)
    `;
}

minSliderThumb.addEventListener("input", minSlider);

maxSliderThumb.addEventListener("input", maxSlider);

window.addEventListener("resize", () => {
    moveFilterOptions();
    getFiltersHeight();
    if (open) {

    }
});

window.addEventListener("load", () => {
    loadPage();
    moveFilterOptions();
    getFiltersHeight();
    minSlider();
    maxSlider();
    navbarPosition = navbar.offsetTop;
});

window.addEventListener("scroll", () => {
    navbarBehavior(header, navbarPosition);
});

scrollUp.addEventListener("click", scrollTop);

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".select-menu");
    const options = dropdown.querySelectorAll(".select-menu li");
    const selected = dropdown.querySelector(".dropdown .selected");

    select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
    });

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", () => {
            selected.innerHTML = options[i].innerHTML;
            select.classList.remove("select-clicked");
            caret.classList.remove("caret-rotate");
            menu.classList.remove("menu-open");
            options.forEach(option => {
                option.classList.remove("active");
            });
            options[i].classList.add("active");
        });
    }
});