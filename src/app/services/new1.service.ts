import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";

@Injectable()
export class New1Service {

  amount_array: Array<number>;
  category_array: Array<string>;
  total_amount: number;
  array_date_amount: Array<{date: any, amount: number}>;

  constructor(private http: Http) { }

  sendemail(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/forget', user,{headers: headers})
      .map(res => res.json());
  }

  Changepass(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/change', user,{headers: headers})
      .map(res => res.json());
  }
}
