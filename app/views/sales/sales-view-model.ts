import { Observable, Frame, EventData, alert } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Product } from '../../models/product.model';
import { Customer } from '../../models/customer.model';

export class SalesViewModel extends Observable {
    private database: DatabaseService;
    private selectedCustomer: Customer | null = null;
    public cartItems: { product: Product; quantity: number }[] = [];

    constructor() {
        super();
        this.database = new DatabaseService();
        this.set('cartItems', []);
        this.updateTotal();
    }

    get selectedCustomerName(): string {
        return this.selectedCustomer ? this.selectedCustomer.name : '';
    }

    get total(): number {
        return this.cartItems.reduce((sum, item) => 
            sum + (item.product.price * item.quantity), 0);
    }

    onSelectCustomer() {
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/customer-select',
            context: {
                onCustomerSelected: (customer: Customer) => {
                    this.selectedCustomer = customer;
                    this.notifyPropertyChange('selectedCustomerName', this.selectedCustomerName);
                }
            }
        });
    }

    onAddProduct() {
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/product-select',
            context: {
                onProductSelected: (product: Product) => {
                    const existingItem = this.cartItems.find(item => item.product.id === product.id);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        this.cartItems.push({ product, quantity: 1 });
                    }
                    
                    this.notifyPropertyChange('cartItems', this.cartItems);
                    this.updateTotal();
                    
                    alert({
                        title: "Sucesso",
                        message: "Produto adicionado ao carrinho!",
                        okButtonText: "OK"
                    });
                }
            }
        });
    }

    onRemoveItem(args: EventData) {
        const index = this.cartItems.indexOf(args.object.bindingContext);
        if (index > -1) {
            this.cartItems.splice(index, 1);
            this.notifyPropertyChange('cartItems', this.cartItems);
            this.updateTotal();
        }
    }

    onFinishSale() {
        if (!this.cartItems || this.cartItems.length === 0) {
            alert({
                title: "Erro",
                message: "Adicione produtos à venda",
                okButtonText: "OK"
            });
            return;
        }

        const sale = {
            customerId: this.selectedCustomer?.id,
            products: this.cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price
            })),
            total: this.total,
            date: new Date()
        };

        this.database.addSale(sale);
        alert({
            title: "Sucesso",
            message: "Venda finalizada com sucesso!",
            okButtonText: "OK"
        }).then(() => {
            this.cartItems = [];
            this.selectedCustomer = null;
            this.notifyPropertyChange('cartItems', this.cartItems);
            this.notifyPropertyChange('selectedCustomerName', this.selectedCustomerName);
            this.updateTotal();
            Frame.topmost().goBack();
        });
    }

    private updateTotal() {
        this.notifyPropertyChange('total', this.total);
    }
}