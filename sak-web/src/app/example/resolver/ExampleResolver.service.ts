import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ExampleService } from '../service/example.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleResolverService implements Resolve<any> {

  constructor(
    private exampleService: ExampleService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`;
      console.error(message);
      return of({
        id: null,
        fieldOne: null,
        fieldTwo: null
      });
    }

    return this.exampleService.getRessourceById('/api/examples', +id);

  }

}
