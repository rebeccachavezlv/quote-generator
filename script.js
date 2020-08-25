const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoadingSpinner = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

let errorCounter = 0;

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://protected-lowlands-50643.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch (proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'unknown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        hideLoadingSpinner()
    } catch (error) {
        if (errorCounter < 10){
            console.log('trying again');
            errorCounter++;
            getQuote();
        } else {
            console.log('cannot get quote')
        }
    }

}

//Tweet Button

const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuote();
