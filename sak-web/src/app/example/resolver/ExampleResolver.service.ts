import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleResolverService implements Resolve<any> {

  constructor(
    private apollo: Apollo,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('id') as string;
    const EXAMPLE = gql`
    query example($id: ID!) {
      example(id: $id) {
        id
        fieldOne
        fieldTwo
      }
    }
  `;
    return this.apollo.query<any>({
      query: EXAMPLE,
      variables: {
        id
      }
    }).pipe(map((result) => result.data.example));

  }

}
