function poll() {
    // Make an HTTP GET request
    fetch('http://localhost:8000/polling')
      .then(response => response.json())
      .then(data => {
        // Process the received data
        console.log(data);
  
        // Call the poll() function again after a delay
        setTimeout(poll, 5000); // 5000 milliseconds = 5 seconds
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
  
        // Call the poll() function again after a delay
        setTimeout(poll, 5000); // 5000 milliseconds = 5 seconds
      });
  }
  
  // Start the polling process
  poll();
  