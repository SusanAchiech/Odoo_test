//loading the html file
document.addEventListener('DOMContentLoaded', function() {
    //retrieving the stockLevel and totalValue elements
    const stockLevelElement = document.getElementById('stockLevel');
    const totalValueElement = document.getElementById('totalValue');

    /*fetching the current stock level and updating
    it with the request received in the response data */
    function updateStockLevel(){
        console.log("Updating stock level...");
        fetch('/api/stock_level')
            .then(response => response.json())
            .then(data => {
                console.log("Stock level data received:", data); 
                stockLevelElement.textContent = data.stock_level;
            });
    }
    /*fetching the total value and update it with the 
    value received */
    function updateTotalValue(){
        console.log("Updating total value...");
        fetch('/api/total_value')
            .then(response => response.json())
            .then(data => {
                console.log("Total value data received:", data); 
                totalValueElement.textContent = data.total_value;
            });
    }

    //populating the stockLevel and totalValue elements
    updateStockLevel();
    updateTotalValue();

    //adding an  event listener for the "submit" event 
    document.getElementById('orderForm').addEventListener('submit', function(event){
        //preventing the default form submission behaviour
        event.preventDefault();
        const orderQuantity = parseInt(document.getElementById('quantity').value);
        const addQuantity = parseInt(document.getElementById('add').value);

        // Determine which action to take based on the button clicked
        if (document.activeElement.id === "addStockBtn") {
            // Adding stock
            fetch('/add_stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({quantity: addQuantity})
            })
            .then(response => response.json())
            .then(data => {
                console.log("Stock added:", data);
                updateStockLevel();
            });
        } else {
            // Placing an order
            fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({quantity: orderQuantity})
            })
            .then(response => response.json())
            .then(data => {
                console.log("Order response:", data);
                alert(data.message);
                updateStockLevel();
                updateTotalValue();
            });
        }
    });
});
