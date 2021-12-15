import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/core.token';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class CoreHttpService {

  constructor(protected http: HttpClient,
    @Inject(BASE_URL) protected baseUrl: string) { }

    getRessources(url: string): Observable<any[]> {
      const serviceUrl = this.baseUrl + url;
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.get<any[]>(serviceUrl, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    getRessourceById(url: string, id: number): Observable<any> {
      const serviceUrl = this.baseUrl + url + '/' + id;
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.get<any>(serviceUrl, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    getRessourceByCriteria(url: string, ...criteria: string[]): Observable<any[]> {
      const serviceUrl = this.baseUrl + url + '?' + criteria.join('&');
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.get<any[]>(serviceUrl, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    createRessource(url: string, ressource: any): Observable<any> {
      const serviceUrl = this.baseUrl + url;
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.post<any>(serviceUrl, ressource, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    editRessource(url: string, ressource: any): Observable<any> {
      const serviceUrl = this.baseUrl + url + '/' + ressource.id;
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.put<any>(serviceUrl, ressource, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    deleteRessource(url: string, id: number): Observable<any> {
      const serviceUrl = this.baseUrl + url + '/' + id;
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.delete<any>(serviceUrl, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    genericSearchApi(url: string, ...query: string[]): Observable<any> {
      let serviceUrl = this.baseUrl + url + '?' + query.join('&');
      if (query.length === 0) {
        serviceUrl = this.baseUrl + url;
      }
      const headers = new HttpHeaders().set('Accept', 'application/ld+json');
      return this.http.get<any>(serviceUrl, {headers}).pipe(
        map( data => ({
          results: data['hydra:member'],
          count: data['hydra:totalItems'],
          links: data['hydra:view']
        })),
        catchError(this.handleError)
      );
    }

    protected handleError(err) {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
      }
      console.error(err);
      return throwError(errorMessage);
    }
}
