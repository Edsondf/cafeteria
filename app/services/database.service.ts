import { Observable } from '@nativescript/core';
import { Product } from '../models/product.model';
import { Customer } from '../models/customer.model';
import { Sale } from '../models/sale.model';

export class DatabaseService extends Observable {
    private products: Product[] = [
        { id: 1, name: 'Café Expresso', price: 5.00, quantity: 100 },
        { id: 2, name: 'Pão de Queijo', price: 3.50, quantity: 50 }
    ];

    private customers: Customer[] = [];
    private sales: Sale[] = [];

    // Products
    getProducts(): Product[] {
        return [...this.products];
    }

    addProduct(product: Omit<Product, 'id'>): Product {
        const newProduct = {
            ...product,
            id: this.products.length + 1
        };
        this.products.push(newProduct);
        return newProduct;
    }

    updateProductQuantity(productId: number, quantity: number): boolean {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.quantity = quantity;
            return true;
        }
        return false;
    }

    // Customers
    getCustomers(): Customer[] {
        return [...this.customers];
    }

    addCustomer(customer: Omit<Customer, 'id'>): Customer {
        const newCustomer = {
            ...customer,
            id: this.customers.length + 1
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    // Sales
    addSale(sale: Omit<Sale, 'id'>): Sale {
        const newSale = {
            ...sale,
            id: this.sales.length + 1
        };
        this.sales.push(newSale);

        // Update product quantities
        sale.products.forEach(item => {
            const product = this.products.find(p => p.id === item.productId);
            if (product) {
                product.quantity -= item.quantity;
            }
        });

        return newSale;
    }

    getSales(): Sale[] {
        return [...this.sales];
    }
}