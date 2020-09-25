import { TasksService } from 'src/app/shared/services/tasks.service';
import { Component, Inject, Input, OnInit } from '@angular/core';

import { TasksDTO } from 'src/app/shared/models/task-model';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskModalComponent } from 'src/app/task-modal/task-modal.component';

@Component({
  selector: 'app-tasks-column',
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss']
})
export class TasksColumnComponent implements OnInit {

  @Input() columnName: String;
  @Input() tasksList: TasksDTO[];
  @Input() tasksLimit: number = 100;
  @Input() type: number;

  constructor(private taskDialog: MatDialog, public taskService: TasksService) { 
  }

  ngOnInit(): void {
  }

  changeTaskStatus(currentTask){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Update Task",
      taskDetails: currentTask
    };
    const dialogRef = this.taskDialog.open(TaskModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newTask => {
      if(newTask)
        this.taskService.updateTaskStatus(currentTask, newTask); 
    });
  }

}
