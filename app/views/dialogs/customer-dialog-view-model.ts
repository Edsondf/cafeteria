import { Observable, Frame, alert } from '@nativescript/core';
import { Customer } from '../../models/customer.model';

export class CustomerDialogViewModel extends Observable {
    private isNew: boolean;
    private onSaveCallback: Function;

    constructor(args: any) {
        super();
        const context = args.context;
        this.isNew = context.isNew;
        this.onSaveCallback = context.onSave;

        if (!this.isNew) {
            const customer = context.customer;
            this.set('name', customer.name);
            this.set('email', customer.email);
            this.set('phone', customer.phone);
            this.set('isMonthly', customer.isMonthly);
            this.set('monthlyCredit', customer.monthlyCredit?.toString() || '0');
        } else {
            this.set('name', '');
            this.set('email', '');
            this.set('phone', '');
            this.set('isMonthly', false);
            this.set('monthlyCredit', '0');
        }
    }

    onSave() {
        const customer = {
            name: this.get('name'),
            email: this.get('email'),
            phone: this.get('phone'),
            isMonthly: this.get('isMonthly'),
            monthlyCredit: parseFloat(this.get('monthlyCredit') || '0')
        };

        if (!customer.name || !customer.email || !customer.phone) {
            alert({
                title: "Erro",
                message: "Por favor, preencha todos os campos obrigatórios.",
                okButtonText: "OK"
            });
            return;
        }

        this.onSaveCallback(customer);
        alert({
            title: "Sucesso",
            message: this.isNew ? "Cliente cadastrado com sucesso!" : "Cliente atualizado com sucesso!",
            okButtonText: "OK"
        }).then(() => {
            Frame.topmost().goBack();
        });
    }

    onCancel() {
        Frame.topmost().goBack();
    }
}