import { Injectable } from '@angular/core';
import {Query, gql} from 'apollo-angular';

export interface ExampleEdge {
  node: Node;
  cursor?: string;
}
export interface Node {
  id: string;
  fieldOne: string;
  fieldTwo: string;
}
export interface ExampleCollection {
  totalCount: number;
  edges: ExampleEdge[];

}
export interface Response {
  examples: ExampleCollection;
}

@Injectable({
  providedIn: 'root'
})
export class ExampleGraphqlService extends Query<Response> {
  document = gql`
    query {
      examples {
        edges {
          node {
            id,
            fieldOne,
            fieldTwo
          }
        },
        totalCount
      }
    }
  `;
}
