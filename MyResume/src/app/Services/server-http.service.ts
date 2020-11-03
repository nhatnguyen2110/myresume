import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'my-auth-token'
    })
  };
  constructor(private httpClient:HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  public getCovid19Summary()
  {
    const url = 'https://api.covid19api.com/summary';
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  public getCovid19VN()
  {
    const url = 'https://api.covid19api.com/live/country/VN';
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  async loadProfile()
  {
    const url = 'assets/data/myProfile.json';
    return await this.httpClient.get(url).toPromise();
  }
  async loadProjects()
  {
    const url = 'assets/data/myProjects.json';
    return await this.httpClient.get(url).toPromise();
  }
}
