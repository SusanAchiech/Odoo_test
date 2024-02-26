document.addEventListener('DOMContentLoaded', function() {
    const stockLevelElement = document.getElementById('stockLevel');
    const orderFormElement = document.getElementById('orderForm');
    const totalValueElement = document.getElementById('totalValue');
    
    function updateStockLevel(){
        fetch('/stock_level')
            .then(response => response.json())
            .then(data => {stockLevelElement.textContent = data.stock_level});
    }

    function updateTotalValue(){
        fetch('/total_value')
            .then(response => response.json())
            .then(data => {totalValueElement.textContent = data.total_value});
    }

    updateStockLevel();
    updateTotalValue();

    orderFormElement.addEventListener('submit', function(event){
        event.preventDefault();
        const quantity = parseInt(document.getElementById('quantity').value);

        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity})
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            updateStockLevel();
            updateTotalValue();
        });
    });
});