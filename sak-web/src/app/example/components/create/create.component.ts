import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExampleFacade } from '../../example.facade';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
              private exampleFacade: ExampleFacade,
              private snackBar: MatSnackBar,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fieldOne: ['', [Validators.required]],
      fieldTwo: ['', [Validators.required]]
    });
  }

  saveData(): void {
    console.log('save');
    const data = {
      fieldOne: this.form.get('fieldOne').value,
      fieldTwo: this.form.get('fieldTwo').value
    };
    this.exampleFacade.createExample(data);
    this.form.reset();
    this.router.navigate(['/liste']).then(
      () => this.snackBar.open('successfully created resource', 'Close', {
        duration: 3000,
      })
    );
  }

}
