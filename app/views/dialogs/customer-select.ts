import { NavigatedData, Page } from '@nativescript/core';
import { CustomerSelectViewModel } from './customer-select-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new CustomerSelectViewModel(args);
}