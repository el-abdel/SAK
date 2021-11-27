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
