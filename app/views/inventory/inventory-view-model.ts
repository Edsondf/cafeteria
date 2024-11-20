import { Observable, Frame, alert, prompt } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Product } from '../../models/product.model';

export class InventoryViewModel extends Observable {
    private database: DatabaseService;
    public products: Product[] = [];

    constructor() {
        super();
        this.database = new DatabaseService();
        this.loadProducts();
    }

    loadProducts() {
        this.products = this.database.getProducts();
        this.notifyPropertyChange('products', this.products);
    }

    onAddProduct() {
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/product-dialog',
            context: {
                isNew: true,
                onSave: (product: Omit<Product, 'id'>) => {
                    this.database.addProduct(product);
                    this.loadProducts();
                    alert({
                        title: "Sucesso",
                        message: "Produto adicionado com sucesso!",
                        okButtonText: "OK"
                    });
                }
            }
        });
    }

    onEditProduct(args: any) {
        const product = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/product-dialog',
            context: {
                product,
                isNew: false,
                onSave: (updatedProduct: Product) => {
                    Object.assign(product, updatedProduct);
                    this.loadProducts();
                    alert({
                        title: "Sucesso",
                        message: "Produto atualizado com sucesso!",
                        okButtonText: "OK"
                    });
                }
            }
        });
    }

    onAddStock(args: any) {
        const product = args.object.bindingContext;
        prompt({
            title: 'Adicionar Estoque',
            message: 'Digite a quantidade:',
            okButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            inputType: 'number'
        }).then((data) => {
            if (data.result) {
                const newQuantity = product.quantity + Number(data.text);
                this.database.updateProductQuantity(product.id, newQuantity);
                this.loadProducts();
                alert({
                    title: "Sucesso",
                    message: "Estoque atualizado com sucesso!",
                    okButtonText: "OK"
                });
            }
        });
    }
}