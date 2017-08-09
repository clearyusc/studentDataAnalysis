// TODO: Make it able to upload a file - need to google: how to get filepath of uploaded file html form

(function () {
  const uploadFileButton = document.querySelector('#btn-upload-file');
  const uploadAPIURL = 'http://localhost:3000/api/upload';

  // TODO: pull function ready(fn) and function ajaxRequest(...) out and put them in a separate module
  // no need to repeat your code!
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

  function uploadFileToDatabase(err) {
    // TODO: show a more advanced success alert 
    if (err) {
      document.window.alert('Error! File could not be uploaded.');
    } else {
      document.window.alert('File successfully uploaded!');
    }
  }

  ready(ajaxRequest('GET', dataAPIURL, uploadFileToDatabase));

  // BUTTON CLICKED
  uploadFileButton.addEventListener('click', () => {
    $('#uploadFileForm').submit(function () {
      $('#uploadStatus').empty().text('File is uploading...');
      $(this).ajaxSubmit({
        error(xhr) {
          status(`Error: ${  xhr.status}`);
        },
        success(response) {
          $('#uploadStatus').empty().text(response);
          console.log(response);
        },
      });
      // Very important line, it disable the page refresh.
      return false;
    });

    // create a FormData object which will be sent as the data payload in ajax req:
    // const formData = new FormData();

    // const file = $('#upload-file-info').html(this.files[0]);

    // formData.append('upload-file', file, file.name);

    // $.ajax({
    //   url: uploadAPIURL,
    //   type: 'POST',
    //   data: formData,
    //   processData: false,
    //   contentType: false,
    //   success(data) {
    //     console.log('File successfully uploaded!');
    //   },
    //   xhr: () => {
    //     return new XMLHttpRequest();
    //   },
    // });

    ajaxRequest('GET', dataAPIURL, uploadFileToDatabase);
  }, false);
});
