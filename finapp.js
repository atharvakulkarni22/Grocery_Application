updateDateTime()
displayCart()
onLoadCart()


function addtoCart(element) {
    fetch('/fetchItem.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: element.parentElement.childNodes[3].childNodes[0].nodeValue }),
    })
        .then(response => response.json())
        .then(data => {
            var itemNumber = data.ItemNumber;
            var name = data.Name;
            var category = data.Category;
            var subcategory = data.Subcategory;
            var unitPrice = data.UnitPrice;
            var quantity = data.Quantity;
            setProducts(itemNumber, name, unitPrice, quantity, category, subcategory);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function addtoCartSC(element) {
    var container = element.parentElement;
    var inputField = container.querySelector('.quant');
    var value1 = inputField.value;

    console.log("Quantity entered: " + value1);

    fetch('/fetchItem.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: element.parentElement.childNodes[3].childNodes[0].nodeValue }),
    })
        .then(response => response.json())
        .then(data => {
            var itemNumber = data.ItemNumber;
            var name = data.Name;
            var category = data.Category;
            var subcategory = data.Subcategory;
            var unitPrice = data.UnitPrice;
            var quantity = data.Quantity;
            setProductsSC(itemNumber, name, unitPrice, quantity, category, subcategory, value1);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function updateTransaction(transactionID) {
    let totalCost = localStorage.getItem('totalCost');
    let customerID = localStorage.getItem('customerID');
    fetch('/insertTransaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalCost: totalCost, transactionID: transactionID, customerID: customerID }),
    })
        .then(response => response.json())
        .then(data => {
            var transactionID = data.transactionID;
            console.log('Transaction ID:', transactionID);
            localStorage.setItem('transactionID', transactionID);

            // You can update the UI or perform other actions as needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function updateInventory(itemNumber, quantity) {
    console.log("In Update inventory");
    fetch('updateInventory.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: '&quantity=' + encodeURIComponent(quantity) + '&itemNumber=' + encodeURIComponent(itemNumber),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Inventory updated!');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


function updateCart(transactionID, customerID, itemNumber, quantity, cartStatus, flag) {
    console.log(encodeURIComponent(cartStatus));
    fetch('updateCart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'transactionID=' + encodeURIComponent(transactionID) +
              '&customerID=' + encodeURIComponent(customerID) +
              '&itemNumber=' + encodeURIComponent(itemNumber) +
              '&quantity=' + encodeURIComponent(quantity) +
              '&cartStatus=' + encodeURIComponent(cartStatus) +
              '&flag=' + encodeURIComponent(flag)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Cart updated!');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setProducts(itemNumber, name, unitPrice, quantity, category, subcategory) {
    let cartContainsItems = localStorage.getItem('productsInCart');
    cartContainsItems = JSON.parse(cartContainsItems);

    if (cartContainsItems != null) {
        if (quantity == 0) {
            alert (name + " Out of stock");
        } else if (cartContainsItems[name] == undefined) {
            cartContainsItems = {
                ...cartContainsItems,
                [name]: {
                    name: name,
                    cartContains: 1,
                    price: unitPrice,
                    itemNumber: itemNumber,
                    category: category,
                    subcategory: subcategory
                }
            }
            totalCostOfProducts(unitPrice);
            shoppingCartNumber();
            updateCart(localStorage.getItem('transactionID'),localStorage.getItem('customerID'), itemNumber, 1, 'In Cart', 0);
            updateTransaction(localStorage.getItem('transactionID'));
            updateInventory(itemNumber, 1);
        } else {
            cartContainsItems[name].cartContains += 1;
            totalCostOfProducts(unitPrice);
            shoppingCartNumber();
            updateCart(localStorage.getItem('transactionID'),localStorage.getItem('customerID'), itemNumber, cartContainsItems[name].cartContains, 'In Cart', 0);
            updateTransaction(localStorage.getItem('transactionID'));
            updateInventory(itemNumber, 1);
        }
    } else {
        if (quantity != 0) {
            cartContainsItems = {
                [name]: {
                    name: name,
                    cartContains: 1,
                    price: unitPrice,
                    itemNumber: itemNumber,
                    category: category,
                    subcategory: subcategory
                }
            }
            totalCostOfProducts(unitPrice);
            shoppingCartNumber();
            updateTransaction(0);
            await sleep(2000);
            updateInventory(itemNumber, 1);
            updateCart(localStorage.getItem('transactionID'),localStorage.getItem('customerID'), itemNumber, 1, 'In Cart', 0);
        } else {
            alert (name + " Out of stock");
        }
    }
    // console.log(cartContainsItems);
    localStorage.setItem("productsInCart", JSON.stringify(cartContainsItems));
}

async function setProductsSC(itemNumber, name, unitPrice, quantity, category, subcategory, value1) {
    let cartContainsItems = localStorage.getItem('productsInCart');
    cartContainsItems = JSON.parse(cartContainsItems);

    if (cartContainsItems != null) {
        if (quantity == 0) {
            alert (name + " Out of stock");
        } else if (cartContainsItems[name] == undefined) {
            if (value1 > quantity) {
                alert (name + " Not valid stock");
            } else {
                cartContainsItems = {
                    ...cartContainsItems,
                    [name]: {
                        name: name,
                        cartContains: value1,
                        price: unitPrice,
                        itemNumber: itemNumber,
                        category: category,
                        subcategory: subcategory
                    }
                }
                totalCostOfProducts(unitPrice);
                shoppingCartNumber();
                updateCart(localStorage.getItem('transactionID'),localStorage.getItem('customerID'), itemNumber, value1, 'In Cart', 0);
                updateTransaction(localStorage.getItem('transactionID'));
                updateInventory(itemNumber, value1);
            }
        } else {
            if (value1 > quantity) {
                alert (name + " Not valid stock");
            } else {
                cartContainsItems[name].cartContains += value1;
                totalCostOfProducts(unitPrice);
                shoppingCartNumber();
                updateCart(localStorage.getItem('transactionID'),localStorage.getItem('customerID'), itemNumber, cartContainsItems[name].cartContains, 'In Cart', 0);
                updateTransaction(localStorage.getItem('transactionID'));
                updateInventory(itemNumber, value1);
            }
            
        }
    } else {
        if ((quantity != 0) && (value1 < quantity)) {
            cartContainsItems = {
                [name]: {
                    name: name,
                    cartContains: value1,
                    price: unitPrice,
                    itemNumber: itemNumber,
                    category: category,
                    subcategory: subcategory
                }
            }
            totalCostOfProducts(unitPrice);
            shoppingCartNumber();
            updateTransaction(0);
            await sleep(2000);
            updateInventory(itemNumber, value1);
            updateCart(localStorage.getItem('transactionID'),localStorage.getItem('customerID'), itemNumber, value1, 'In Cart', 0);
        } else {
            alert (name + " Out of stock");
        }
    }
    // console.log(cartContainsItems);
    localStorage.setItem("productsInCart", JSON.stringify(cartContainsItems));
}


function totalCostOfProducts(unitPrice) {
    let totalCost = localStorage.getItem('totalCost');
    if(totalCost != null) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalCost", totalCost + parseInt(unitPrice));
    } else {
        localStorage.setItem("totalCost", parseInt(unitPrice));
    }
}


function shoppingCartNumber() {
    let pNumber = localStorage.getItem('shopCartNumber');
    pNumber = parseInt(pNumber);
    if (pNumber) {
        localStorage.setItem('shopCartNumber', pNumber + 1);
        document.querySelector('.cartdiv span').textContent = pNumber + 1;
    } else {
        localStorage.setItem('shopCartNumber', 1);
        document.querySelector('.cartdiv span').textContent = 1;
    }
}

function deleteItem(item_Number, contains, itemNameToDelete) {
    const transactionID = localStorage.getItem('transactionID');
    const customerID = localStorage.getItem('customerID');
    fetch('updateCartItem.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'transactionID=' + encodeURIComponent(transactionID) +
              '&customerID=' + encodeURIComponent(customerID) +
              '&itemNumber=' + encodeURIComponent(item_Number)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        let productsInCart = localStorage.getItem('productsInCart');
        console.log(productsInCart);
        productsInCart = JSON.parse(productsInCart);
        delete productsInCart[itemNameToDelete];

        localStorage.setItem('productsInCart', JSON.stringify(productsInCart));

        console.log('Cart Item updated!');
        updateInventory(item_Number, -contains);
        window.location.href = 'Cart.html';

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function displayCart() {
    let totalCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart');
    const transactionID = localStorage.getItem('transactionID');
    cartItems = JSON.parse(cartItems);
    //console.log(cartItems);
    let productContainer = document.querySelector(".products");
    //console.log(cartItems);
    if( cartItems && productContainer) {
        //console.log(item.name);
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <div class="item_Number">${item.itemNumber}</div>
                <div class="item_name">
                    <img src="./images/${item.name}.jpg" style="width: 75px; height: 50px;">
                    <span>${item.name}</span>
                </div>
                <div class="category">${item.category}</div>
                <div class="subcategory">${item.subcategory}</div>
                <div class="tid">${transactionID}</div>
                <div class="price_of_item">${item.price}</div>
                <div class="quantity_of_products">
                    ${item.cartContains}
                </div>
                <div class="total_price">
                    ${item.cartContains * item.price}
                </div>
                <div class="delete_button">
                <button onclick="deleteItem(${item.itemNumber}, ${item.cartContains}, '${item.name}')">Del</button>
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="totalBasket">
                <h4 class="totalTitle">
                    Basket Total
                </h4>
                <h4 class="totalBasketValue">
                    ${totalCost}
                </h4>
            </div>
        `;
    }
}

function onLoadCart() {
    let pNumbers = localStorage.getItem('shopCartNumber');

    if (pNumbers) {
        document.querySelector('.cartdiv span').textContent = pNumbers;
    }
}

function updateProductDisplay(data) {
    const main = document.getElementsByClassName('columnright')[0];
    main.innerHTML = '';
    if (data && data.length > 0) {
        data.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product-container');
            const productCard = document.createElement('div');
            productCard.classList.add('product-box');

            productCard.innerHTML = `
                <img src="${product.Image}" alt="${product.Name}">
                <strong>${product.Name}</strong>
				<span class="quantity">1</span>
				<span class="price">$${product.UnitPrice}</span>
				<a class="cart-btn add-to-cart" onclick="addtoCart(this)">Add to Cart
				</a>
            `;

            main.appendChild(productCard);
        });
    }
}

function updateSCProductDisplay(data) {
    const main = document.getElementsByClassName('row2')[0];
    main.innerHTML = '';
    if (data && data.length > 0) {
        data.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product-container');
            const productCard = document.createElement('div');
            productCard.classList.add('product-box');
            productCard.classList.add('type_of_candy');

            productCard.innerHTML = `
                <img src="${product.Image}" alt="${product.Name}">
                <strong>${product.Name}</strong>
				<input type="number" class="quant" placeholder="Quantity">
				<span class="price">$${product.UnitPrice}</span>
				<a class="cart-btn add-to-cart" onclick="addtoCartSC(this)">Add to Cart
				</a>
            `;

            main.appendChild(productCard);
        });
    }
}

function search_candies() { 
    let input = document.getElementById('searchbar').value 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('type_of_candy');
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="list-item";                  
        } 
    } 
} 

function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    //console.log(now);
    document.querySelector('#datetime').innerHTML = currentDateTime;
}

function updateTransactionStatus(transactionID, transactionStatus) {
    fetch('updateTransaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'transactionID=' + encodeURIComponent(transactionID) +
              '&transactionStatus=' + encodeURIComponent(transactionStatus)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Trnsaction updated!');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function revert() {
    let customerID = localStorage.getItem('customerID');
    let transactionID = localStorage.getItem('transactionID');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    updateTransactionStatus(transactionID, 'Cancelled');

    console.log('Transaction ID:', transactionID);
    console.log('Transaction Status:', 'Cancelled');

    Object.values(cartItems).map(item => {
        console.log(item.itemNumber, item.cartContains);
        updateInventory(item.itemNumber, -item.cartContains);
    });

    updateCart(transactionID, customerID, 1, 1, 'Cancelled', 1);
    localStorage.removeItem('totalCost');
    localStorage.removeItem('shopCartNumber');
    localStorage.removeItem('productsInCart');
    //localStorage.clear();
    window.location.href = 'Cart.html';
}

async function checkout() {
    let customerID = localStorage.getItem('customerID');
    let transactionID = localStorage.getItem('transactionID');

    updateTransactionStatus(transactionID, 'Shipped');

    console.log('Transaction ID:', transactionID);
    console.log('Transaction Status:', 'Shopped');

    updateCart(transactionID, customerID, 1, 1, 'Shopped', 1);
    localStorage.clear();
    doneShopping.style.display = "block";
    beforeShopping.style.display = "none";
    removeButtons.style.display = "none";
    //window.location.href = 'Cart.html';
}

function loadTransactionTable(flag) {
    const customerid = localStorage.getItem('customerID');
    if(flag == 0) {
        const month = document.getElementById("specificMonth").value;
        console.log(month);
        fetch('getTransactionsByMonth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'month=' + encodeURIComponent(month) +
                  '&customerID=' + encodeURIComponent(customerid)
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
                    displayTransactionTable(headers, data, 'getTransactionsByMonth');
                }
                else {
                    displayMessage('No transactions', 'getTransactionsByMonth')
                }
            })
            .catch(error => {
                console.error("Error fetching transaction data:", error);
            });
    }
    else if(flag == 1) {
        fetch('getTransactionsOf3Months.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'customerID=' + encodeURIComponent(customerid)
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
                displayTransactionTable(headers, data, 'getTransactions');
            }
            else {
                displayMessage('No transactions', 'getTransactions')
            }
        })
        .catch(error => {
            console.error("Error fetching transaction data:", error);
        });
    }
    else if (flag == 2) {
        const year = document.getElementById("specificYear").value;
        fetch('getTransactionByYear.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'customerID=' + encodeURIComponent(customerid) +
                  '&year=' + encodeURIComponent(year)
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
                    displayTransactionTable(headers, data, 'getTransactionsByYear');
                }
                else {
                    displayMessage('No transactions', 'getTransactionsByYear')
                }
            })
            .catch(error => {
                console.error("Error fetching transaction data:", error);
            });
    }
}

function displayTransactionTable(headers, data, containerId) {
    console.log(headers);
    let tableContainer = document.getElementById(containerId);
    if (!tableContainer) {
        console.log(`Container with ID '${containerId}' not found.`);
        return;
    }
    tableContainer.innerHTML = '';
    const table = document.createElement("table");
    const headerRow = table.insertRow();

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    headerRow.insertCell().textContent = "Actions"
    data.forEach(transaction => {
        const row = table.insertRow();
        headers.forEach(header => {
            const cell = row.insertCell();
            cell.textContent = transaction[header];
        });
        const actionsCell = row.insertCell();
        const checkItemsButton = document.createElement("button");
        checkItemsButton.textContent = "View Items";
        checkItemsButton.addEventListener("click", () => checkItems(transaction.TransactionID, row));
        actionsCell.appendChild(checkItemsButton);

        if (transaction.TransactionStatus === 'In Cart') {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Cancel";
            deleteButton.addEventListener("click", () => deleteTransaction(transaction.TransactionID));
            actionsCell.appendChild(deleteButton);
        }
    });
    tableContainer.appendChild(table);
}


function deleteTransaction(transactionId) {
    updateTransactionStatus(transactionId, 'Cancelled');
    updateCart(transactionId, localStorage.getItem('customerID'), 1, 1, 'Cancelled', 1);
    window.location.href = 'MyAccount.html';
}

function checkItems(transactionId, clickedRow) {
    // Fetch cart items for the specified transaction ID
    fetch("get_cart_items.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'transactionId=' + encodeURIComponent(transactionId)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(cartItems => {
            // Display cart items in a new table below the clicked row
            displayCartItems(clickedRow, cartItems);

            clickedRow.querySelector("button").style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching cart items:", error.message);
        });
}

function displayCartItems(clickedRow, cartItems) {
    // Create a table for cart items
    const cartTable = document.createElement("table");
    cartTable.classList.add("cart-table");

    // Create table header
    const headerRow = cartTable.insertRow();
    for (const key in cartItems[0]) {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }

    // Create table rows for cart items
    cartItems.forEach(cartItem => {
        const row = cartTable.insertRow();
        for (const key in cartItem) {
            const cell = row.insertCell();
            cell.textContent = cartItem[key];
        }
    });

    const cartTableContainer = document.createElement("div");
    cartTableContainer.classList.add("cart-table-container");

    // Insert the cart table into the container
    cartTableContainer.appendChild(cartTable);

    // Insert the cart table container below the clicked row
    const newRow = clickedRow.parentNode.insertRow(clickedRow.rowIndex + 1);
    const newCell = newRow.insertCell();
    newCell.colSpan = clickedRow.cells.length;
    newCell.appendChild(cartTableContainer);
}
