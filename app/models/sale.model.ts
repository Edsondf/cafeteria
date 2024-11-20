export interface Sale {
    id: number;
    customerId?: number;
    products: {
        productId: number;
        quantity: number;
        price: number;
    }[];
    total: number;
    date: Date;
}