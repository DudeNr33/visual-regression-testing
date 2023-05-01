import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../common/page';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private cardsUrl = 'http://localhost:8000/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Page<Card>> {
    return this.http.get<Page<Card>>(this.cardsUrl);
  }
}
