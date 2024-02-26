from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Define Product and Order classes
class Product:
    def __init__(self, name, quantity_on_hand, unit_price):
        self.name = name
        self.quantity_on_hand = quantity_on_hand
        self.unit_price = unit_price

    def add_stock(self, quantity):
        self.quantity_on_hand += quantity

    def remove_stock(self, quantity):
        if quantity > self.quantity_on_hand:
            raise ValueError("Requested amount exceeds the existing stock.")
        self.quantity_on_hand -= quantity

    def check_stock_level(self):
        return self.quantity_on_hand

    def calculate_total_value(self):
        return self.quantity_on_hand * self.unit_price

class Order:
    def __init__(self):
        self.order_items = {}

    def add_item(self, product, quantity):
        if quantity > product.quantity_on_hand:
            raise ValueError("Requested amount exceeds the existing stock.")
        self.order_items[product] = quantity
        product.remove_stock(quantity)

    def remove_item(self, product):
        if product in self.order_items:
            quantity = self.order_items[product]
            product.add_stock(quantity)
            del self.order_items[product]

    def calculate_total_value(self):
        total_value = 0
        for product, quantity in self.order_items.items():
            total_value += product.calculate_total_value() * quantity
        return total_value

# Define maize_flour and order
maize_flour = Product("Maize Flour", 100, 100)
order = Order()
order.add_item(maize_flour, 10)

# Define routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stock_level')
def get_stock_level():
    return jsonify({'stock_level': maize_flour.check_stock_level()})

@app.route('/api/order', methods=['POST'])
def place_order():
    data = request.get_json()
    quantity = data['quantity']
    try:
        order.add_item(maize_flour, quantity)
        return jsonify({'message': 'Order placed successfully'})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/total_value')
def get_total_value():
    return jsonify({'total_value': order.calculate_total_value()})

if __name__ == '__main__':
    app.run(debug=True)