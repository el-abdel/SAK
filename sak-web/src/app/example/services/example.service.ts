import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/core.token';
import { CoreHttpService } from 'src/app/core/services/core-http.service';
import { Example } from 'src/app/example/models/example';

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends CoreHttpService<Example> {

  constructor(
    protected http: HttpClient,
    @Inject(BASE_URL) protected baseUrl: string
    ) {
    super(http, baseUrl);
  }

}
