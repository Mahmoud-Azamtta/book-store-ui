import { functions } from "./bookoryScripts.js";
import books from "../json/books.json" assert { type: "json" };;

const {
    loadPage,
    navbarBehavior,
    scrollTop,
    buildStarRating
} = functions;

const scrollUp = document.querySelector(".navbar .scroll-up");
const navigatioLinks = document.querySelector(".navigation-links");
const bookTitle = document.querySelector(".book-information h1");
const bookCover = document.querySelector(".book-details .book-cover img");
const starRating = document.querySelector(".book-information .star-rating");
const bookCost = document.querySelector(".book-information .cost-value");
const bookOverview = document.querySelector(".book-information .overview");
const authorName = document.querySelector(".book-information .author-name");
const bookCategory = document.querySelector(".book-information .category");
const relatedBooksWrapper = document.querySelector(".related .row");
const navbar = document.querySelector(".navbar");
const quantityBtns = document.querySelectorAll(".quantity-btn button");
const quantityIndicator = document.querySelector(".quantity-btn .quantity");

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");
const currentBook = books.find(element => element.bookId == bookId);

let navbarPosition;

quantityBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.backgroundColor = "rgb(246, 93, 78)";
        console.log(btn.style.backgroundColor);
        if (btn.classList.contains("increase"))
            updateQuantity("increase");
        else 
            updateQuantity("decrease");
    });
});

function updateQuantity(cls) {
    let currentValue = parseInt(quantityIndicator.innerHTML);
    if (cls == "increase") {
        quantityIndicator.innerHTML = ++currentValue;
        console.log(quantityIndicator.innerHTML, currentValue);
    }
    else if (cls == "decrease" && currentValue == 1) {
        console.log(cls, currentValue);
        return;
    }
    else {
        quantityIndicator.textContent = --currentValue;
        console.log(cls);
    }
}

function displayBookDetais() {
    bookTitle.textContent = currentBook.bookTitle;
    authorName.textContent = currentBook.author;
    starRating.innerHTML = buildStarRating(currentBook.rating) + `<span class="text-black fw-bold"> (${currentBook.rating})</span>`
    bookCover.setAttribute("src", currentBook.bookCover);
    bookCost.textContent = currentBook.cost; 
    bookOverview.textContent = currentBook.overview;
    bookCategory.textContent = currentBook.genre;
}

function displayRelatedBooks() {
    let relatedBooks = books.filter(element => element.genre == currentBook.genre);
    relatedBooks.forEach(book => {
        if (book.bookId == currentBook.bookId) 
            return;
        relatedBooksWrapper.innerHTML += buildBook(book);
    });
}

function buildBook(book) {
    let rating = buildStarRating(book.rating);
    return `
        <div class=" my-3 border-end">
            <div class="item mx-auto">
                <div class="img-container">
                    <img src="${book.bookCover}" alt="Memorial">
                    <div class="img-icons">
                        <a href="#" class="heart d-flex justify-content-center align-items-center"><i
                                class="fa-solid fa-heart"></i></a>
                        <a href="#" class="seen d-flex justify-content-center align-items-center"><i
                                class="fa-regular fa-eye"></i></a>
                        <a href="#" class="cart d-flex justify-content-center align-items-center"><i
                                class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
                <div class="book-desc">
                    <a href="#" class="d-block mt-3">${book.bookTitle}</a>
                    <div class="star-rating my-2">
                        ${rating}
                    </div>
                    <p class="my-2">${book.author}</p>
                    <span>$${book.cost}</span>
                </div>
            </div>
        </div>
    `;
}


window.addEventListener("scroll", () => {
    navbarBehavior(navigatioLinks, navbarPosition);
});

window.addEventListener("load", loadPage);

scrollUp.addEventListener("click", scrollTop);

displayBookDetais();
displayRelatedBooks();

window.addEventListener("load", () => {
    loadPage();
    navbarPosition = navbar.offsetTop;
});