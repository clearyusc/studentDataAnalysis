(function () {
  // <script src='/public/graphController.client.js'></script>
  // const graphController = require(`${process.cwd()}/public/graphController.client.js`);
  const numRoundDecimalPlaces = 3; // e.g. 12.125
  const calcAvgButton = document.querySelector('#btn-calc-avg');
  const graphButton = document.querySelector('#btn-make-graph');

  const beginButton = document.querySelector('#btn-begin');
  const resetButton = document.querySelector('#btn-reset-data');

  const xSearchBar = document.querySelector('#searchX');
  const ySearchBar = document.querySelector('#searchY');

  const dataAvgNumber = document.querySelector('#show-data-avg');
  const dataLegend = document.querySelector('#data-legend');

  const graphContexts = [];
  dataAvgNumber.innerHTML = '';

  const dataAPIURL = 'http://localhost:3000/api/data';
  const barGraphString = 'BAR';
  const lineGraphString = 'LINE';
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
      const keyA = parseInt(a._id, 10); // decimal (10)
      const keyB = parseInt(b._id, 10); // decimal (10)
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

  function createBarGraph(xValues, yValues, datasetSizes, graphLabel) {
    const ctx = document.querySelector(`#myGraph_${graphContexts.length + 1}`);
    graphContexts.push(ctx);
    const myGraph = new Chart(ctx, {
      type: 'bar',
      data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: xValues,
        datasets: [{
          label: graphLabel,
          data: yValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        tooltips: {
          callbacks: {
            label(tooltipItem) {
              return `Dataset size: ${datasetSizes[tooltipItem.index]}, val = ${mathRound(yValues[tooltipItem.index], numRoundDecimalPlaces)}`;
            },
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  function createScatterGraph(xyPairs, graphLabel) {
    const ctx = document.querySelector(`#myGraph_${graphContexts.length + 1}`);
    graphContexts.push(ctx);
    const scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: graphLabel,
          data: xyPairs,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
          }],
        },
      },
    });
  }

  function createLineGraph(xValues, yValues, graphLabel) {
    const ctx = document.querySelector(`#myGraph_${graphContexts.length + 1}`);
    graphContexts.push(ctx);
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: graphLabel,
          data: yValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
          showLine: null,
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  function updateGraphData(data) {
    const graphDataObj = JSON.parse(data);
    // dataAvgNumber.innerHTML = JSON.stringify(graphDataObj);
    // TODO: Push this code change to the backend in processdata.js
    const xValues = [];
    const yValues = []; // these should be unique given our current setup
    const datasetSizes = [];

    // TODO: update this way of inputting the label:    
    // INPUT THIS SWITCH VAL FROM THE DOCUMENT SELECTOR
    // 'BAR'
    switch ('BAR') {
      case barGraphString:
        graphDataObj.forEach((obj) => {
          xValues.push(obj._id);
          yValues.push(obj.avgXValue); // don't be confused - this is not a typo!
          datasetSizes.push(obj.datasetSize);
        });
        createBarGraph(xValues, yValues, datasetSizes, `${xSearchBar.value} vs. ${ySearchBar.value}`);
        break;
      case 'SCATTER':
        createScatterGraph(graphDataObj, 'label!');
        break;
      case 'LINE':
        graphDataObj.forEach((obj) => {
          xValues.push(obj.x);
          yValues.push(obj.y); // don't be confused - this is not a typo!
        });
        createLineGraph(xValues, yValues, `${xSearchBar.value} vs. ${ySearchBar.value}`);
        break;
      default:
        break;
    }
  }

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
