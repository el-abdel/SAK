import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Example } from '../../models/example';
import {ExampleFacade} from '../../example.facade';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  data: Example;
  form: FormGroup;
  private routerSub: Subscription;
  constructor(private fb: FormBuilder,
              private exampleFacade: ExampleFacade,
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
    console.log('save');
    const data = {...this.data, ...{
      fieldOne: this.form.get('fieldOne').value,
      fieldTwo: this.form.get('fieldTwo').value
    }};
    this.exampleFacade.updateExample(data);
    this.form.reset();
    this.router.navigate(['/liste']).then(
      () => this.snackBar.open('successfully updated resource', 'Close', {
        duration: 3000,
      })
    );
  }

}
