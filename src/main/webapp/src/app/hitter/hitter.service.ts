import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Hit} from './Hit';
import {ValuatedHit} from './ValuatedHit';
import {HitterComponent} from './hitter.component';
import {Observable} from 'rxjs';

@Injectable()
export class HitterService{
  constructor(private http: HttpClient) {
  }
  makeHit(hit: Hit): Observable<any>{
    const body = JSON.stringify(hit);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    return this.http.post('http://localhost:7450/api/hit', body, options);
  }
}
