function registerCustomer(event) {
    event.preventDefault();

    // Validate inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Perform validation
    if (password !== confirmPassword) {
        showError("Passwords do not match!");
        return;
    }

    if (password.length < 8) {
        showError("Password must be at least 8 characters long.");
        return;
    }

    if (!dob.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        showError("Invalid date of birth format. Use MM/DD/YYYY.");
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showError("Invalid email format.");
        return;
    }

    // If all validations pass, redirect to FreshProducts.html
    //window.location.href = 'FreshProducts.html';
}

function showError(message) {
    // Display an error message to the user
    alert("Error: " + message);
}