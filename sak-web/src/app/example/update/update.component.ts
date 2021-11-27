import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Node} from '../../core/entities/example';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  data: Node;
  form: FormGroup;
  private routerSub: Subscription;
  constructor(private fb: FormBuilder,
              private apollo: Apollo,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fieldOne: ['', [Validators.required]],
      fieldTwo: ['', [Validators.required]]
    });

    this.routerSub = this.route.paramMap.subscribe(
      () => {
        const resolvedData: any = this.route.snapshot.data.resolvedData;
        this.data = resolvedData;
        this.form.patchValue({
          fieldOne: resolvedData.fieldOne ? resolvedData.fieldOne : '',
          fieldTwo: resolvedData.fieldTwo ? resolvedData.fieldTwo : '',
        });
      }
    );
  }

  saveData(): void {
    const UPDATE_EXAMPLE = gql`
    mutation updateExample($input: updateExampleInput!) {
      updateExample(input: $input) {
        example {
          id
          fieldOne
          fieldTwo
        }
      }
    }
    `;
    const data = {
      id: this.data.id,
      fieldOne: this.form.get('fieldOne').value,
      fieldTwo: this.form.get('fieldTwo').value
    };
    this.apollo.mutate({
      mutation: UPDATE_EXAMPLE,
      variables: {
        input: data
      }
    }).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/liste']).then(
          () => this.snackBar.open('successfully updated resource', 'Close', {
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
