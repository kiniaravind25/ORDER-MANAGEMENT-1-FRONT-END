document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const loadOrdersButton = document.getElementById('load-orders');
    const loadItemsButton = document.getElementById('load-items');
    const orderList = document.getElementById('order-list');
    const itemList = document.getElementById('items-list');

    // Handle form submission to create an order
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userId = document.getElementById('userId').value;
        const items = document.getElementById('items').value;

        const orderData = {
            userId: parseInt(userId),
            items: JSON.parse(items)
        };

        try {
            const response = await fetch('http://localhost:8080/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert('Order created successfully!');
                orderForm.reset();
            } else {
                alert('Failed to create order.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating order.');
        }
    });

    // Load and display orders
    loadOrdersButton.addEventListener('click', async () => {
        const userId = document.getElementById('userId').value;
        
        try {
            const response = await fetch(`http://localhost:8080/orders/user/${userId}`);
            
            if (response.ok) {
                const orders = await response.json();
                orderList.innerHTML = '';
                
                orders.forEach(order => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Order ID: ${order.id}, Total Price: ${order.totalPrice}`;
                    orderList.appendChild(listItem);
                });
            } else {
                alert('Failed to load orders.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error loading orders.');
        }
    });


    

    // Load and display items
    loadItemsButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:8080/items');
            
            if (response.ok) {
                const items = await response.json();
                itemList.innerHTML = '';
                
                items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Item ID: ${item.id}, Name: ${item.name}, Price: ${item.price}`;
                    itemList.appendChild(listItem);
                });
            } else {
                alert('Failed to load items.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error loading items.');
        }
    });
});
