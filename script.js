document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn').addEventListener('click', () => {
        // Collect input values
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // Data to send in the POST request
        const data = {
            username: username,
            password: password
        };

        // Send data to the server
        fetch('/', {
            method: 'POST', // Specify the method as POST
            headers: {
                'Content-Type': 'application/json' // Send JSON data
            },
            body: JSON.stringify(data) // Convert data object to JSON
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            // Display the response message
            document.getElementById('dataContainer').innerText = data.message;
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            document.getElementById('dataContainer').innerText = 'Error submitting data';
        });
    });
});
