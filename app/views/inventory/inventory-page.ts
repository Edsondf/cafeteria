import { NavigatedData, Page } from '@nativescript/core';
import { InventoryViewModel } from './inventory-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new InventoryViewModel();
}