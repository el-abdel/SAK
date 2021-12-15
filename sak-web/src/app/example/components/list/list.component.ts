import { Component, OnInit, ViewChild } from '@angular/core';
import { Example } from 'src/app/example/models/example';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ExampleFacade} from '../../example.facade';

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
    private exampleFacade: ExampleFacade,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.exampleFacade.isUpdating$().subscribe(
      isUpdating => this.isLoadingResults = isUpdating,
      error => console.error(error)
    );

    this.exampleFacade.getExamples$().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      error => console.error(error)
    );
    this.exampleFacade.loadExamples();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteResource(example: Example): void {
    this.exampleFacade.removeExample(example);
    this.snackBar.open('successfully deleted resource', 'Close', {
      duration: 3000,
    });
  }

}
