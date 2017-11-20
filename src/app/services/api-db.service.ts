import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiDbService {

  constructor(private http: Http) { }

  public getAllData() {
    return this.http.get('https://api.mlab.com/api/1/databases/cloudfirst/collections/gaz-users/5a12cf68734d1d40318bdee3?apiKey=bkrXAXOr5IwTC3JZ1jLbJ68bIQknSxZE')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateAllData(sourceUsersModel: any) {
    let options = new RequestOptions();
    return this.http.put('https://api.mlab.com/api/1/databases/cloudfirst/collections/gaz-users/5a12cf68734d1d40318bdee3?apiKey=bkrXAXOr5IwTC3JZ1jLbJ68bIQknSxZE',
      { 'elementData': sourceUsersModel }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }

}
