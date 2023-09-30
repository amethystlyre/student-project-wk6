var searchForm = document.querySelector('#search-form');
var userQ = document.querySelector('#search-input').value;
var userF = document.querySelector('#format-input').value;


searchForm.addEventListener("submit", searchHandler);


function searchHandler(event){
  event.preventDefault();
  let userQ = document.querySelector('#search-input').value;
  let userF = document.querySelector('#format-input').value;

  if (!userQ){}
  
  let queryString =`/search-results.html?q=${userQ}&format=${userF}`;

  //location.replace(queryString);
  location.assign(queryString);

}
