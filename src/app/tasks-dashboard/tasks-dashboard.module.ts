import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { from } from 'rxjs';

import { TasksDashboardComponent } from './tasks-dashboard.component';
import { TasksColumnComponent } from './tasks-column/tasks-column.component';

@NgModule({
  declarations: [TasksColumnComponent],
  imports: [
    CommonModule,
    TasksDashboardComponent
  ],
  exports: [
    TasksDashboardComponent
  ]
})
export class TasksDashboardModule { }
