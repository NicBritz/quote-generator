const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//show newQuote
function newQuote() {
  showLoadingSpinner();
  let rndNumber = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // catch and replace null authors
  authorText.textContent = quote.author || "Unknown";

  // set styling depending on length
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // set quote text
  quoteText.textContent = quote.text;

  removeLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (e) {
    // catch the error
    console.log(e);
  }
}

// tweet a quote
function tweetQuote() {
  twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// tweet
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
