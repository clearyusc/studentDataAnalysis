(function () {
  const uploadFileButton = document.querySelector('#btn-upload-file');
  const calcAvgButton = document.querySelector('#btn-calc-avg');
  
  const dataAvgNumber = document.querySelector('#show-data-avg');
  // const deleteButton = document.querySelector('.btn-delete');
  // const clickNbr = document.querySelector('#click-nbr');
  const dataAPIURL = 'http://localhost:3000/api/data';
  const keysAPIURL = 'http://localhost:3000/api/keys';

  function ready(fn) {
    if (typeof fn !== 'function') {
      return;
    }

    if (document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  }

  // Wrapper with boilerplate code to easily implement an AJAX Request
  function ajaxRequest(method, url, callback) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

  function updateDataAvg(data) {
    const studentDataObj = JSON.parse(data);
    dataAvgNumber.innerHTML = studentDataObj.clicks;
  }

  ready(ajaxRequest('GET', dataAPIURL, updateDataAvg));


  uploadFileButton.addEventListener('click', () => {    
    ajaxRequest('POST', dataAPIURL, () => {
      ajaxRequest('GET', dataAPIURL, updateDataAvg);
    });
  }, false); //what is this false?

  calcAvgButton.addEventListener('click', () => {
    const xKey = 'G3'; // TODO: load the XKey from the searchbar1
    const yKey = 'sex'; // TODO: load the yKey from the searchbar2

    ajaxRequest('GET', `${dataAPIURL}/${xKey}/${yKey}`, updateDataAvg);
  });
        
  $('.ui.search')
    .search({
      source: content,
    });
});

/* front-end plan

1. Button to upload the data file
2. AJAX request to put data file from csv to mongo.
3. Populate search bar keys with data from the csv, now json (the keys!)
4. When search is pressed, perform an AJAX request to get the avgXForY(searchBar1Key, searchBar2Key).
5. Asynch return that and display to html.
6. Display a graph


  */
