const axios = require("axios");

const BASE_URL = "http://localhost:3000";

/**
 * Get all books (using Promises)
 */
function getAllBooks() {
  return axios
    .get(`${BASE_URL}/books`)
    .then(response => {
      console.log("All Books:");
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching all books", error.message);
    });
}

/**
 * Get book by ISBN (using async/await)
 */
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/book/${isbn}`);
    console.log(`Book with ISBN ${isbn}:`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching book by ISBN", error.message);
  }
}

/**
 * Get books by Author (using callbacks)
 */
function getBooksByAuthor(author, callback) {
  axios
    .get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`)
    .then(response => {
      console.log(`Books by author ${author}:`);
      console.log(response.data);
      callback(null, response.data);
    })
    .catch(error => {
      callback(error.message, null);
    });
}

/**
 * Get books by Title (using async/await)
 */
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/books/title/${encodeURIComponent(title)}`
    );
    console.log(`Books with title "${title}":`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching books by title", error.message);
  }
}

/* ---- Test Calls (required for demonstration) ---- */

// Promises
getAllBooks();

// Async/Await
getBookByISBN(1);
getBooksByTitle("Things Fall Apart");

// Callbacks
getBooksByAuthor("Chinua Achebe", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
