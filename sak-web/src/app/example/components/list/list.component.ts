import { Component, OnInit, ViewChild } from '@angular/core';
import { Example } from 'src/app/example/models/example';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExampleService } from '../../services/example.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = ['fieldOne', 'fieldTwo', 'action'];
  filterValue = '';
  dataSource: MatTableDataSource<Example>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private exampleService: ExampleService,
    private snackBar: MatSnackBar,
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
    this.exampleService.getRessources('/api/examples').pipe(
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });
  }

  deleteResource(id: number): void {
    this.exampleService.deleteRessource('/api/examples', id).subscribe(
      () => {
        this.loadData();
        this.snackBar.open('successfully deleted resource', 'Close', {
          duration: 3000,
        });
      }
    );
  }

}
