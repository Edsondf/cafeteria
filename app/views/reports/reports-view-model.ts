import { Observable, Frame } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';
import { Sale } from '../../models/sale.model';

export class ReportsViewModel extends Observable {
    private database: DatabaseService;
    public sales: Sale[] = [];

    constructor() {
        super();
        this.database = new DatabaseService();
        this.loadSales();
    }

    get totalSales(): number {
        return this.sales.length;
    }

    get totalRevenue(): number {
        return this.sales.reduce((sum, sale) => sum + sale.total, 0);
    }

    loadSales() {
        this.sales = this.database.getSales();
        this.notifyPropertyChange('sales', this.sales);
        this.notifyPropertyChange('totalSales', this.totalSales);
        this.notifyPropertyChange('totalRevenue', this.totalRevenue);
    }

    onViewSaleDetails(args: any) {
        const sale = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'views/dialogs/sale-details',
            context: { sale }
        });
    }
}