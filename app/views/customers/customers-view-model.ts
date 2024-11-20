import { Observable, Frame, alert } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Customer } from '../../models/customer.model';

export class CustomersViewModel extends Observable {
    private database: DatabaseService;
    public customers: Customer[] = [];

    constructor() {
        super();
        this.database = new DatabaseService();
        this.loadCustomers();
    }

    loadCustomers() {
        this.customers = this.database.getCustomers();
        this.notifyPropertyChange('customers', this.customers);
    }

    onAddCustomer() {
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/customer-dialog',
            context: {
                isNew: true,
                onSave: (customer: Omit<Customer, 'id'>) => {
                    this.database.addCustomer(customer);
                    this.loadCustomers();
                    alert({
                        title: "Sucesso",
                        message: "Cliente cadastrado com sucesso!",
                        okButtonText: "OK"
                    });
                }
            }
        });
    }

    onEditCustomer(args: any) {
        const customer = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/customer-dialog',
            context: {
                customer,
                isNew: false,
                onSave: (updatedCustomer: Customer) => {
                    Object.assign(customer, updatedCustomer);
                    this.loadCustomers();
                    alert({
                        title: "Sucesso",
                        message: "Cliente atualizado com sucesso!",
                        okButtonText: "OK"
                    });
                }
            }
        });
    }
}