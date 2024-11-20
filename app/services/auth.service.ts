import { Observable } from '@nativescript/core';

export class AuthService extends Observable {
    private users = [
        { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
        { id: 2, username: 'cashier', password: 'cash123', role: 'cashier' },
        { id: 3, username: 'teste', password: '1234', role: 'admin' }
    ];

    login(username: string, password: string): boolean {
        const user = this.users.find(u => 
            u.username === username && u.password === password
        );
        return !!user;
    }
}