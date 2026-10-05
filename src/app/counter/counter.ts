import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  valeur = 20;
  carre = this.valeur * this.valeur;
  pair = this.valeur % 2 === 0;

  initValeur() {
    this.valeur = 0;
  }

  incrementValeur() {
    this.valeur++;
  }



  value = signal(20);
  square = computed( () => this.value() * this.value());
  even = computed( () => this.value() % 2 === 0);

  reset() {
    this.value.set(0);
  }

  increment() {
    this.value.update(v => v+1 );
  }

  constructor() {
    effect(() => {
      console.log('Valeur actuelle :', this.value());
    });
  }
}
