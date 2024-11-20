import { NavigatedData, Page } from '@nativescript/core';
import { CustomerDialogViewModel } from './customer-dialog-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new CustomerDialogViewModel(args);
}