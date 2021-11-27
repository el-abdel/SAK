import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {ExampleEdge} from '../../core/entities/example';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  dataQuery: QueryRef<any>;
  private querySubscription: Subscription;
  isLoadingResults = true;
  displayedColumns: string[] = ['fieldOne', 'fieldTwo', 'action'];
  filterValue = '';
  dataSource: MatTableDataSource<ExampleEdge>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const LIST_EXAMPLE = gql`
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
    this.dataQuery = this.apollo.watchQuery<any>({
      query: LIST_EXAMPLE,
      pollInterval: 500,
    });
    this.querySubscription = this.dataQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.dataSource = new MatTableDataSource(data.examples.edges);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = loading;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    this.dataQuery.refetch();
  }

  deleteResource(id: number): void {
    const DELETE_EXAMPLE = gql`
    mutation deleteExample($input: deleteExampleInput!) {
      deleteExample(input: $input) {
        example{
          id
        }
      }
    }
    `;
    this.apollo.mutate({
      mutation: DELETE_EXAMPLE,
      variables: {
        input: {id}
      }
    }).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('successfully deleted resource', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('there was an error sending the query', error);
      }
    );

  }

  ngOnDestroy(): void {
  }

}
