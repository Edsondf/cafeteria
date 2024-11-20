import { NavigatedData, Page } from '@nativescript/core';
import { ProductSelectViewModel } from './product-select-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ProductSelectViewModel(args);
}