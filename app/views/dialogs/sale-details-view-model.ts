import { Observable, Frame } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Sale } from '../../models/sale.model';

export class SaleDetailsViewModel extends Observable {
    private database: DatabaseService;
    public sale: Sale;

    constructor(args: any) {
        super();
        this.database = new DatabaseService();
        this.sale = args.context.sale;
        
        const customer = this.sale.customerId 
            ? this.database.getCustomers().find(c => c.id === this.sale.customerId)
            : null;
        
        this.set('customerName', customer ? customer.name : 'Cliente não identificado');
        this.set('formattedDate', new Date(this.sale.date).toLocaleDateString());
        
        // Enrich products with names
        const products = this.database.getProducts();
        this.sale.products = this.sale.products.map(item => ({
            ...item,
            productName: products.find(p => p.id === item.productId)?.name || 'Produto não encontrado'
        }));
    }

    onBack() {
        Frame.topmost().goBack();
    }
}