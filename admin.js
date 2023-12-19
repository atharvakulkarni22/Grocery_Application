function showUploadForm() {
    document.getElementById("uploadForm").style.display = "block";
}

// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    console.log(file);
    const fileType = document.getElementById('fileType');
    const selectedFileType = fileType.options[fileType.selectedIndex].value;
    console.log(selectedFileType);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', selectedFileType);
    fetch('uploadInventory.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function createResultTable(headers, data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = table.insertRow();

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    data.forEach(rowData => {
        const row = table.insertRow();
        headers.forEach(header => {
            const cell = row.insertCell();
            cell.textContent = rowData[header];
        });
    });

    container.appendChild(table);
}

function displayMessage(message, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<p>${message}</p>`;
}

// Other functions remain the same

function viewInventory() {
    fetch('getInventory.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            createResultTable(headers, data, 'inventoryResults');
        } else {
            displayMessage('No inventory data available.', 'inventoryResults');
        }
    })
    .catch(error => console.error('Error:', error));
}

function viewLowInventory() {
    fetch('getLowInventory.php')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            createResultTable(headers, data, 'lowInventoryResults');
        } else {
            displayMessage('No low inventory items.', 'lowInventoryResults');
        }
    })
    .catch(error => console.error('Error:', error));
}

function viewCustomersWithTransactions() {
    const specificDate = document.getElementById("specificDate").value;
    fetch('getCustomersWithTransactions.php' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'date=' + encodeURIComponent(specificDate)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            createResultTable(headers, data, 'customersWithTransactionsResults');
        } else {
            displayMessage('No customers with transactions on the specified date.', 'customersWithTransactionsResults');
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayMessage(message, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}

function viewCustomersByZipAndMonth() {
    const zipcode = document.getElementById("zipCode").value;
    const month = document.getElementById("specificMonth").value;
    const formattedDate = new Date(month + "-01").toISOString().split('T')[0];
    console.log(formattedDate);
    fetch('getCustomersByZipMonth.php' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'zip=' + encodeURIComponent(zipcode) +
              '&month=' + encodeURIComponent(formattedDate)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log(data);
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            createResultTable(headers, data, 'customersByZipAndMonthResults');
        } else {
            displayMessage('No customers with the given zip code and month', 'customersByZipAndMonthResults');
        }
    })
    .catch(error => console.error('Error:', error));
}

function modifyInventoryItem() {
    const itemNo = document.getElementById("itemNumber").value;
    const price = document.getElementById("newUnitPrice").value;
    const quantity = document.getElementById("newQuantity").value;
    fetch('modifyInventory.php' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'itemNo=' + encodeURIComponent(itemNo) +
              '&price=' + encodeURIComponent(price) +
              '&quantity=' + encodeURIComponent(quantity)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        if (data['success']) {
            displayMessage('Update Successful', 'modifyInventory');
        } else {
            displayMessage('Update Failed', 'modifyInventory');
        }
    })
    .catch(error => console.error('Error:', error));
}

function viewCustomersOlderThan20() {
    fetch('getCustomersOlderThan20.php')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log(data);
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            createResultTable(headers, data, 'customersOlderThan20Results');
        } else {
            displayMessage('No customers older than 20 with more than 3 transactions', 'customersOlderThan20Results');
        }
    })
    .catch(error => console.error('Error:', error));
}