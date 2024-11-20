import { NavigatedData, Page } from '@nativescript/core';
import { SaleDetailsViewModel } from './sale-details-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new SaleDetailsViewModel(args);
}