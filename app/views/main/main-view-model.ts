import { Observable, Frame } from '@nativescript/core';

export class MainViewModel extends Observable {
    constructor() {
        super();
        this.set('welcomeMessage', 'Bem-vindo ao Sistema de Gestão');
    }

    onSalesRegister() {
        Frame.topmost().navigate({
            moduleName: 'views/sales/sales-page'
        });
    }

    onInventory() {
        Frame.topmost().navigate({
            moduleName: 'views/inventory/inventory-page'
        });
    }

    onCustomers() {
        Frame.topmost().navigate({
            moduleName: 'views/customers/customers-page'
        });
    }

    onReports() {
        Frame.topmost().navigate({
            moduleName: 'views/reports/reports-page'
        });
    }

    onLogout() {
        Frame.topmost().navigate({
            moduleName: 'views/login/login-page',
            clearHistory: true
        });
    }
}