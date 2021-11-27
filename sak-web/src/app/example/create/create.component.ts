import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
              private apollo: Apollo,
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
    const CREATE_EXAMPLE = gql`
    mutation createExample($input: createExampleInput!) {
        createExample(input: $input) {
          example {
            id
            fieldOne
            fieldTwo
          }
        }
      }
    `;
    const data = {
      fieldOne: this.form.get('fieldOne').value,
      fieldTwo: this.form.get('fieldTwo').value
    };

    this.apollo.mutate({
      mutation: CREATE_EXAMPLE,
      variables: {
        input: data
      }
    }).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/liste']).then(
          () => this.snackBar.open('successfully created resource', 'Close', {
            duration: 3000,
          })
        );
      },
      (error) => {
        console.error('there was an error sending the query', error);
      }
    );
  }

}
