import { Component } from '@angular/core';
import { Counter } from './counter/counter';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [Counter, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
