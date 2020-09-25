import { TasksService } from 'src/app/shared/services/tasks.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TasksDTO } from '../shared/models/task-model';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})
export class TasksDashboardComponent implements OnInit {


  constructor(private taskDialog: MatDialog,
    public taskService: TasksService) { }

  ngOnInit(): void {
  }

  addTask(){
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Create Task"
    };
    const dialogRef = this.taskDialog.open(TaskModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newTask => {
      if(newTask)
        this.taskService.updateTaskStatus(null, newTask);
    });
  }

}
