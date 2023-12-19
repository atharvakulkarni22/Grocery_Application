# Grocery Application

The Grocery Application is a user-friendly platform designed to simplify and enhance the grocery shopping experience. With an intuitive interface and a robust set of features, this application aims to streamline the process of creating, managing, and completing your grocery lists.

## Table of Contents
- You will be able to shop by category and subcategory. Also you can also add inventory using admin login.
- Need a web server like Apache, MySQL and PHP.
  
## Features

After validating the user’s inputs, you should assign a unique customer ID to each customer and register each customer by inserting the customer’s information in the customer table and the user table of your database. After inserting the
customer ’s information into your database successfully

User name and password for the admin. In the my account page, the admin should be able to add new inventory as XML/JSON files to your database. The new inventory for fresh products, frozen products, candies, and
snacks categories is XML file. The new inventory for baking products, Breakfast products, and pantry products categories is JSON file. The admin should be able to see the content of the inventory table. The admin should be able to see the 
list of items that are low in the inventory ( less than 3 ). The admin should be able to enter a specific date and see the list of customers with more than 2 transactions. The admin should be able to enter a zip code and a month and see the customers who live in the zip code and with more than 2 transactions in the specified month. The admin should be able to enter a item number and modify the unit
price and/or the Quantity in inventory for the item in the inventory table. The admin should be able to see the list of the customers who are older than 20 years old and have move than 3 transactions.

In this application, the user can shop by sub category ( shop all, all vegetable, all fruits, pre-cut fruits, flowers, salsa and dips, season produce, new items and rollbacks ). When the user selects a category, all
items of the selected sub category should be displayed. The user should see name, picture and price of each item. The user should be able to add each item to the cart. The user should be able to add each item multiple times to the cart.
For each selected item, If you do not have enough inventory, you should display a message that the item is out stock . When the user adds an item to the cart, you should update the inventory, cart, and transaction tables accordingly.

In the cart page, the user can see information about all the items in the cart ( Item id, category, sub category, name, amount, price for each
item. The user can also see transaction id, and price for all items). If the user shops the items in the cart, you should change the status of transaction
from in cart to shopped). If the user cancels shopping, you should update the inventory, cart, and transaction tables accordingly.

In the the account page, the user can see the the status of each the last transaction and all items in each transactions. The user can
cancel each transaction if the status of the transaction is not shopped transaction. 

## Installation
Clone the repository.
git clone https://github.com/atharvakulkarni22/GroceryApplication.git

##Images
<img width="1264" alt="image" src="https://github.com/atharvakulkarni22/GroceryApplication/assets/55804217/9153232c-a45d-4229-979b-2fbb55253973">
<img width="1277" alt="image" src="https://github.com/atharvakulkarni22/GroceryApplication/assets/55804217/8315f479-58dd-47a7-ba63-5da7c44fd686">
<img width="1269" alt="image" src="https://github.com/atharvakulkarni22/GroceryApplication/assets/55804217/29ce269b-d92c-45d3-bcdd-46eb240ba53f">


