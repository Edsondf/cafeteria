import { Observable, Frame } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Product } from '../../models/product.model';

export class ProductSelectViewModel extends Observable {
    private database: DatabaseService;
    private onProductSelectedCallback: Function;
    private products: Product[] = [];

    constructor(args: any) {
        super();
        this.database = new DatabaseService();
        this.onProductSelectedCallback = args.context.onProductSelected;
        this.set('searchQuery', '');
        this.loadProducts();
    }

    loadProducts() {
        this.products = this.database.getProducts();
        this.filterProducts();
    }

    get filteredProducts(): Product[] {
        const query = this.get('searchQuery').toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(query) &&
            product.quantity > 0
        );
    }

    onSearch() {
        this.filterProducts();
    }

    onClear() {
        this.set('searchQuery', '');
        this.filterProducts();
    }

    onSelectProduct(args: any) {
        const product = args.object.bindingContext;
        console.log('Product selected in dialog:', product); // Debug log
        this.onProductSelectedCallback(product);
        Frame.topmost().goBack();
    }

    onCancel() {
        Frame.topmost().goBack();
    }

    private filterProducts() {
        this.notifyPropertyChange('filteredProducts', this.filteredProducts);
    }
}