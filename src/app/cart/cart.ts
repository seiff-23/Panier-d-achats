import { Component, signal, WritableSignal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../item';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  items: WritableSignal<Item[]> = signal<Item[]>([
    { id: 11, photo: 'articles/lait.jpg', name: 'lait', price: 1.35, quantity: 2 },
    { id: 12, photo: 'articles/pate.jpg', name: 'pâtes', price: 0.41, quantity: 1 },
    { id: 13, photo: 'articles/riz.jpg', name: 'riz', price: 3.8, quantity: 1 },
    { id: 14, photo: 'articles/yaourt.jpg', name: 'yaourt', price: 0.6, quantity: 6 },
  ]);

  id = 14;

  totalItems = computed(() => {
    let total = 0;
    this.items().map(item => {
      total = total + item.quantity;
    });
    return total;
  });

  totalPrice = computed(() => {
    let total = 0;
    this.items().map(item => {
      total = total + item.price * item.quantity;
    });
    return total;
  });

  remise = computed(() => this.totalPrice() > 100 ? this.totalPrice() * 0.02 : 0);
  
  finalPrice = computed(() => this.totalPrice() - this.remise());

  updateQuantity(item: Item, value: number) {
    this.items.update(articles => articles.map(article =>
      article.id === item.id ? { ...article, quantity: article.quantity + value } : article
    ).filter(article => article.quantity > 0));
  }

  addItem() {
    this.id++;
    this.items.update(articles => {
      const nouveauTableau = [...articles];
      nouveauTableau.push({
        id: this.id, photo: 'articles/eau.jpg', name: 'eau', price: 0.7, quantity: 1
      });
      return nouveauTableau;
    });
  }

  deleteItem(nom: string) {
    this.items.update(articles => articles.filter(article => article.name !== nom));
  }

  constructor() {
    effect(() => {
      console.log('Articles du panier :', this.items());
    });
  }
}
