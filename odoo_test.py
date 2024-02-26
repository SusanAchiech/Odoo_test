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
        print(f"Current stock level for {self.name}: {self.quantity_on_hand}")

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

# Define maize_flour
maize_flour = Product("Maize Flour", 100, 100)

# Use maize_flour in the Order
order = Order()
order.add_item(maize_flour, 10)

print(f"Stock level after order: {maize_flour.quantity_on_hand} kg")
print(f"Total value of order: {order.calculate_total_value()}")

order.remove_item(maize_flour)

print(f"Stock level after order removal: {maize_flour.quantity_on_hand} kg")
print(f"Total value after order removal: {order.calculate_total_value()}")
