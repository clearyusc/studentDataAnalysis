(function () {
  // const mathRound = require(`${process.cwd()}/app/data_processing/mathRound.js`);
  const numRoundDecimalPlaces = 3; // e.g. 12.125
  const calcAvgButton = document.querySelector('#btn-calc-avg');
  const graphButton = document.querySelector('#btn-make-graph');

  const beginButton = document.querySelector('#btn-begin');
  const resetButton = document.querySelector('#btn-reset-data');

  const xSearchBar = document.querySelector('#searchX');
  const ySearchBar = document.querySelector('#searchY');

  const dataAvgNumber = document.querySelector('#show-data-avg'); 
  const dataAPIURL = 'http://localhost:3000/api/data';
  dataAvgNumber.innerHTML = 'v1.0';

  // let input = document.getElementById('myinput');
  // new Awesomplete(input, {
  //   list: ['Ada', 'Java', 'JavaScript', 'LOLCODE', 'Node.js', 'Ruby on Rails'],
  // });

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

  function mathRound(number, precision) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  function displayJSON(data) {
    const strings = [];
    data.forEach((obj, i) => {
      if (obj._id != null) {
        if (typeof obj.avgXValue !== 'number') {
          strings.push(`${obj._id}: ${obj.avgXValue} `);
        } else {
          strings.push(`${obj._id}: ${mathRound(obj.avgXValue, numRoundDecimalPlaces)} `);
        }
      }
    });

    // TODO: figure out why this doesn't do anything...
    // Sort the data just to make it more visually appealing
    strings.sort((a, b) => {
      const keyA = parseInt(a['_id'], 10); // decimal (10)
      const keyB = parseInt(b['_id'], 10); // decimal (10)
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    return strings;
  }
  // function displayJSON(data) {
  //   let strings = [];
  //   data.forEach((obj, i) => {
  //     if (obj._id != null) {
  //       strings[i] = `${obj._id}:`;
  //       if (typeof obj.avgXValue === 'number') {
  //         const num = mathRound(obj.avgXValue, numRoundDecimalPlaces);
  //         strings[i] = strings[i].concat(`${num}`);
  //       } else {
  //         strings[i] = strings[i].concat(`${obj.avgXValue}`);
  //       }
  //     }
  //   });
  //   return strings;
  // }

  function updateDataAvg(data) {
    const studentDataObj = JSON.parse(data);
    dataAvgNumber.innerHTML = displayJSON(studentDataObj);
    // dataAvgNumber.innerHTML = studentDataObj.avgXValue;
  }

  function sendCSVToDatabase(response) {
    dataAvgNumber.innerHTML = `${response}`;
  }

  function resetDatabase(response) {
    dataAvgNumber.innerHTML = `${response}`;  
  }

  function updateGraphData(data) {
    const graphDataObj = JSON.parse(data);
    dataAvgNumber.innerHTML = JSON.stringify(graphDataObj);
  }


  // *** the ready function simply loads something on PAGE LOAD ***
  // ready(ajaxRequest('GET', `${dataAPIURL}/csvtomongo`, sendCSVToDatabase));

  calcAvgButton.addEventListener('click', () => {
    // ready(ajaxRequest('GET', dataAPIURL, updateDataAvg)); // TODO: This might cause a problem bc the url is hardcoded...
    const xKey = xSearchBar.value;
    const yKey = ySearchBar.value;
    // const xKey = 'G3'; // TODO: load the XKey from the searchbar1
    // const yKey = 'sex'; // TODO: load the yKey from the searchbar2

    ajaxRequest('GET', `${dataAPIURL}/${xKey}/${yKey}`, updateDataAvg);
  });

  beginButton.addEventListener('click', () => {
    dataAvgNumber.innerHTML = 'begin button pressed... waiting for AJAX response';
    ajaxRequest('GET', `${dataAPIURL}/csvtomongo`, sendCSVToDatabase);
  });

  resetButton.addEventListener('click', () => {
    dataAvgNumber.innerHTML = 'Reseting database now... waiting for AJAX response';
    ajaxRequest('GET', `${dataAPIURL}/reset`, resetDatabase);
  });

  graphButton.addEventListener('click', () => {
    const xKey = xSearchBar.value;
    const yKey = ySearchBar.value;

    ajaxRequest('GET', `${dataAPIURL}/graph/${xKey}/${yKey}`, updateGraphData);
  });
}());

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
