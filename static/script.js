document.addEventListener('DOMContentLoaded', function() {
    const stockLevelElement = document.getElementById('stockLevel');
    const orderFormElement = document.getElementById('orderForm');
    const totalValueElement = document.getElementById('totalValue');
    
    function updateStockLevel(){
        console.log("Updating stock level...");
        fetch('/api/stock_level')
            .then(response => response.json())
            .then(data => {console.log("Stock level data received:", data); stockLevelElement.textContent = data.stock_level});
    }

    function updateTotalValue(){
        console.log("Updating total value...");
        fetch('/api/total_value')
            .then(response => response.json())
            .then(data => {console.log("Total value data received:", data); totalValueElement.textContent = data.total_value});
    }

    updateStockLevel();
    updateTotalValue();


    // Add event listener for add stock button
document.getElementById('addStockBtn').addEventListener('click', function() {

    // Get quantity
    const quantity = document.getElementById('addQuantityInput').value;
  
    // Make POST request to /add_stock endpoint
    fetch('/add_stock', {
      method: 'POST',
      body: JSON.stringify({quantity}) 
    })
    .then(response => response.json())
    .then(data => {
      // Update stock level
      updateStockLevel();
    });
  
  });
    orderFormElement.addEventListener('submit', function(event){
        event.preventDefault();
        const quantity = parseInt(document.getElementById('quantity').value);

        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Order response:", data);
            alert(data.message);
            updateStockLevel();
            updateTotalValue();
        });
    });
});