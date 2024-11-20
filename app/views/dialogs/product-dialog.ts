import { NavigatedData, Page } from '@nativescript/core';
import { ProductDialogViewModel } from './product-dialog-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ProductDialogViewModel(args);
}