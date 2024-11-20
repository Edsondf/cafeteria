import { Observable, Frame } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Customer } from '../../models/customer.model';

export class CustomerSelectViewModel extends Observable {
    private database: DatabaseService;
    private onCustomerSelectedCallback: Function;
    private customers: Customer[] = [];

    constructor(args: any) {
        super();
        this.database = new DatabaseService();
        this.onCustomerSelectedCallback = args.context.onCustomerSelected;
        this.loadCustomers();
        this.set('searchQuery', '');
    }

    loadCustomers() {
        this.customers = this.database.getCustomers();
        this.filterCustomers();
    }

    get filteredCustomers(): Customer[] {
        const query = this.get('searchQuery').toLowerCase();
        return this.customers.filter(customer => 
            customer.name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query)
        );
    }

    onSearch() {
        this.filterCustomers();
    }

    onClear() {
        this.set('searchQuery', '');
        this.filterCustomers();
    }

    onSelectCustomer(args: any) {
        const customer = args.object.bindingContext;
        this.onCustomerSelectedCallback(customer);
        Frame.topmost().goBack();
    }

    onCancel() {
        Frame.topmost().goBack();
    }

    private filterCustomers() {
        this.notifyPropertyChange('filteredCustomers', this.filteredCustomers);
    }
}