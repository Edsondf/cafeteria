import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
    private authService: AuthService;

    constructor() {
        super();
        this.authService = new AuthService();
        this.set('username', '');
        this.set('password', '');
        this.set('errorMessage', '');
    }

    onLoginTap() {
        const username = this.get('username');
        const password = this.get('password');

        if (this.authService.login(username, password)) {
            console.log('Login successful');
            this.set('errorMessage', '');
            // Navigate to main menu after successful login
            Frame.topmost().navigate({
                moduleName: 'views/main/main-page',
                clearHistory: true
            });
        } else {
            console.log('Login failed');
            this.set('errorMessage', 'Invalid username or password');
        }
    }
}