import { Observable, Frame } from '@nativescript/core';
import { Product } from '../../models/product.model';

export class ProductDialogViewModel extends Observable {
    private isNew: boolean;
    private onSaveCallback: Function;

    constructor(args: any) {
        super();
        const context = args.context;
        this.isNew = context.isNew;
        this.onSaveCallback = context.onSave;

        if (!this.isNew) {
            const product = context.product;
            this.set('name', product.name);
            this.set('price', product.price.toString());
            this.set('quantity', product.quantity.toString());
            this.set('description', product.description || '');
        } else {
            this.set('name', '');
            this.set('price', '');
            this.set('quantity', '');
            this.set('description', '');
        }
    }

    onSave() {
        const product = {
            name: this.get('name'),
            price: parseFloat(this.get('price')),
            quantity: parseInt(this.get('quantity')),
            description: this.get('description')
        };

        if (!product.name || isNaN(product.price) || isNaN(product.quantity)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        this.onSaveCallback(product);
        Frame.topmost().goBack();
    }

    onCancel() {
        Frame.topmost().goBack();
    }
}