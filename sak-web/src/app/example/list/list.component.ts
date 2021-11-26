import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { ExampleService } from '../service/example.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExampleEdge, ExampleGraphqlService} from '../service/example.graphql.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = ['fieldOne', 'fieldTwo', 'action'];
  filterValue = '';
  dataSource: MatTableDataSource<ExampleEdge>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    // private exampleService: ExampleService,
    private exampleGraphqlService: ExampleGraphqlService,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData() {
    console.log('in loading');
    this.isLoadingResults = true;
    this.exampleGraphqlService.watch()
      .valueChanges
      .subscribe(({ data, loading }) => {
      this.dataSource = new MatTableDataSource(data.examples.edges);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = loading;
    });
  }

  deleteResource(id: number): void {
    /*this.exampleService.deleteRessource('/api/examples', id).subscribe(
      () => {
        this.loadData();
        this.snackBar.open('successfully deleted resource', 'Close', {
          duration: 3000,
        });
      }
    );*/
  }

}
