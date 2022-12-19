import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExampleState } from './state/example.state';
import { ExampleService } from './services/example.service';
import { Example } from './models/example';

@Injectable({
  providedIn: 'root'
})
export class ExampleFacade{
  constructor(private exampleAPI: ExampleService, private examplesState: ExampleState){}

  isUpdating$(): Observable<boolean>{
    return this.examplesState.isUpdating$();
  }
  getExamples$(): Observable<Example[]>{
    return this.examplesState.getExamples$();
  }

  loadExamples(){
    this.exampleAPI.getRessources('/api/examples')
      .subscribe(
        (examples) => this.examplesState.setExamples(examples),
        (error) => console.error(error)
      );
  }

  createExample(example: Example){
    this.examplesState.setUpdating(true);
    this.exampleAPI.createRessource('/api/examples', example)
      .subscribe(
        (addedExample) => this.examplesState.createExample(addedExample),
        (error) => console.error(error),
        () => this.examplesState.setUpdating(false)
      );
  }

  updateExample(exampleToUpdate: Example){
    this.examplesState.setUpdating(true);
    this.exampleAPI.editRessource('/api/examples', exampleToUpdate.id, exampleToUpdate)
      .subscribe(
        (updatedExample) => this.examplesState.updateExample(updatedExample),
        (error) => console.error(error),
        () => this.examplesState.setUpdating(false)
      );
  }

  removeExample(exampleToRemove: Example){
    this.examplesState.setUpdating(true);
    this.exampleAPI.deleteRessource('/api/examples', exampleToRemove.id)
      .subscribe(
        () => this.examplesState.removeExample(exampleToRemove),
        (error) => console.error(error),
        () => this.examplesState.setUpdating(false)
      );
  }
}
