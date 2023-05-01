import { Component } from '@angular/core';
import { Card } from './card';
import { CardsService } from './cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  cards: Card[] = [];
  constructor(private cardsService: CardsService) { }
  ngOnInit(): void {
    this.cardsService.getCards().subscribe(cards => {
      console.log(cards);
      this.cards = cards.content;
    });
  }
}
