import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TasksDTO } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  backlogTasksLimit: number = 5;
  developmentTasksLimit: number = 4;
  
  backlogTasksList: TasksDTO[] = [];
  developmentTasksList: TasksDTO[] = [];
  reviewTasksList: TasksDTO[] = [];
  acceptedTasksList: TasksDTO[] = [];
  
  
  backlogsTasksListSubject: BehaviorSubject<TasksDTO[]> = new BehaviorSubject([]);
  backlogstasksItemsList$ = this.backlogsTasksListSubject.asObservable ();
  developmentsTasksListSubject: BehaviorSubject<TasksDTO[]> = new BehaviorSubject([]);
  developmentsTasksItemsList$ = this.developmentsTasksListSubject.asObservable ();
  reviewsTasksListSubject: BehaviorSubject<TasksDTO[]> = new BehaviorSubject([]);
  reviewsTasksItemsList$ = this.reviewsTasksListSubject.asObservable ();
  acceptanceTasksListSubject: BehaviorSubject<TasksDTO[]> = new BehaviorSubject([]);
  acceptanceTasksItemsList$ = this.acceptanceTasksListSubject.asObservable ();

  constructor() {
   }

  updateTaskStatus(prevTask: any, currentTask: any){
    let taskIndex = -1;
    if(prevTask && prevTask !== null){
      switch (prevTask.taskStatus) {
        case 1:
          taskIndex = this.backlogTasksList.findIndex(x => x.taskId === prevTask.taskId);   
          if(taskIndex !== -1)
            this.backlogTasksList.splice(taskIndex, 1);     
          break;
        case 2:
          taskIndex = this.developmentTasksList.findIndex(x => x.taskId === prevTask.taskId);   
          if(taskIndex !== -1)
            this.developmentTasksList.splice(taskIndex, 1);     
          break;
        case 3:
          taskIndex = this.reviewTasksList.findIndex(x => x.taskId === prevTask.taskId);   
          if(taskIndex !== -1)
            this.reviewTasksList.splice(taskIndex, 1);     
          break;
        case 4:
          taskIndex = this.acceptedTasksList.findIndex(x => x.taskId === prevTask.taskId);   
          if(taskIndex !== -1)
            this.acceptedTasksList.splice(taskIndex, 1);     
          break;
        default:
          break;
      }
    }


    switch (currentTask.taskStatus) {
      case 1:
        if(this.backlogTasksList.length <= this.backlogTasksLimit)
          this.backlogTasksList.push(currentTask);  
          this.backlogsTasksListSubject.next(this.backlogTasksList);
        break;
      case 2:
        if(this.developmentTasksList.length <= this.developmentTasksLimit)
          this.developmentTasksList.push(currentTask);  
          this.developmentsTasksListSubject.next(this.developmentTasksList);
        break;
      case 3:
        this.reviewTasksList.push(currentTask);   
        this.reviewsTasksListSubject.next(this.reviewTasksList);
        break;
      case 4:
        this.acceptedTasksList.push(currentTask);   
        this.acceptanceTasksListSubject.next(this.acceptedTasksList);
        break;
      default:
        break;
    }

  }
}
