(function () {
  const calcAvgButton = document.querySelector('#btn-calc-avg');
  const beginButton = document.querySelector('#btn-begin');
  const dataAvgNumber = document.querySelector('#show-data-avg');
  const dataAPIURL = 'http://localhost:3000/api/data';
  dataAvgNumber.innerHTML = 'v1.0';

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
    dataAvgNumber.innerHTML = JSON.stringify(data);
    //dataAvgNumber.innerHTML = studentDataObj.avgXValue;
  }

  function sendCSVToDatabase(response) {
    dataAvgNumber.innerHTML = `${response}`;
  }


  // *** the ready function simply loads something on PAGE LOAD ***
  //ready(ajaxRequest('GET', `${dataAPIURL}/csvtomongo`, sendCSVToDatabase));

  calcAvgButton.addEventListener('click', () => {
    //ready(ajaxRequest('GET', dataAPIURL, updateDataAvg)); // TODO: This might cause a problem bc the url is hardcoded...
    const xKey = 'G3'; // TODO: load the XKey from the searchbar1
    const yKey = 'sex'; // TODO: load the yKey from the searchbar2

    ajaxRequest('GET', `${dataAPIURL}/${xKey}/${yKey}`, updateDataAvg);
  });

  beginButton.addEventListener('click', () => {
    dataAvgNumber.innerHTML = 'begin button pressed... waiting for AJAX response';
    ajaxRequest('GET', `${dataAPIURL}/csvtomongo`, sendCSVToDatabase);
  });
})();

// SEARCH UI!
//   $('.ui.search')
//     .search({
//       source: content,
//     });
// });

/* front-end plan

1. Button to upload the data file [IF WE HAVE TIME, OTHERWISE KEEP IT IN PROJECT]
2. AJAX request to put data file from csv to mongo.
3. Populate search bar keys with data from the csv, now json (the keys!)
4. When search is pressed, perform an AJAX request to get the avgXForY(searchBar1Key, searchBar2Key).
5. Asynch return that and display to html.
6. Display a graph

notes:
- need to give public access to this file somehow or just copy it to public/
- need to figure out a way to upload file easily
- DO THE BARE MINIMUM AND DO A GOOD JOB!

  */