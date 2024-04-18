#!/usr/bin/node
const request = require('request');

/**
 * Wrapper function for making HTTP GET requests
 * @param   {String} url - URL for the GET request
 * @returns {Promise}    - Promise that resolves with parsed JSON response
 *                          or rejects with the request error.
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        try {
          resolve(JSON.parse(body));
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

/**
 * Entry point - makes requests to Star Wars API
 * for movie info based on the movie ID passed as a CLI parameter.
 * Retrieves movie character info then prints their names
 * in order of appearance in the initial response.
 */
async function main() {
  const [,, movieId] = process.argv;

  if (!movieId) {
    console.error('Please provide a movie ID.');
    return;
  }

  const movieUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;
  try {
    const movie = await makeRequest(movieUrl);

    if (!movie.characters || movie.characters.length === 0) {
      console.error('No characters found for this movie.');
      return;
    }

    for (const characterUrl of movie.characters) {
      const character = await makeRequest(characterUrl);
      console.log(character.name);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
