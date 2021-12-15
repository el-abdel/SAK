import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Example } from '../models/example';

@Injectable({
  providedIn: 'root'
})
export class ExampleState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private examples$ = new BehaviorSubject<Example[]>(null);

  isUpdating$(){
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean){
    this.updating$.next(isUpdating);
  }

  getExamples$(){
    return this.examples$.asObservable();
  }

  setExamples(examples: Example[]){
    this.examples$.next(examples);
  }

  createExample(example: Example){
    const currentExamples = this.examples$.getValue();
    this.examples$.next([...currentExamples, example]);
  }

  removeExample(exampleToRemove: Example){
    const currentExamples = this.examples$.getValue();
    this.examples$.next(currentExamples.filter(example => example.id !== exampleToRemove.id));
  }

  updateExample(exampleToUpdate: Example){
    const currentExamples = this.examples$.getValue();
    const indexToUpdate = currentExamples.findIndex(example => example.id === exampleToUpdate.id);
    currentExamples[indexToUpdate] = exampleToUpdate;
    this.examples$.next([...currentExamples]);
  }

}
