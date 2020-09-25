import { TasksDTO } from 'src/app/shared/models/task-model';
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit, AfterViewChecked {
  modalTitle = 'Add Task';
  task: TasksDTO;

  taskForm = this.formBuilder.group({
    title: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    dueDate: ['', Validators.compose([Validators.required])],
    status: [1, Validators.compose([Validators.required])],
  });

  constructor(
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) inputData: any,
    private changeDetectRef: ChangeDetectorRef
  ) {
    this.modalTitle = inputData.title;

    if (inputData.taskDetails && inputData.taskDetails !== null) {
      
      this.task = JSON.parse(JSON.stringify(inputData.taskDetails));
      this.taskForm.get('title').setValue(this.task.title);
      this.taskForm.get('status').setValue(this.task.taskStatus);
      this.taskForm.get('dueDate').setValue(this.formatDate(moment(new Date(this.task.dueDate)).toISOString()));
      this.taskForm.get('description').setValue(this.task.description);
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectRef.detectChanges();
  }

  ngOnInit(): void {}

  saveTask() {
    let data = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: moment(this.taskForm.value.dueDate).format('MM-DD-YYYY'),
      taskStatus: parseInt(this.taskForm.value.status),
    };
    if(this.task && this.task !== null){
      data = {...data, ...{"taskId": this.task.taskId}};
    }
    this.dialogRef.close(data);
  }

  cancel() {
    this.dialogRef.close();
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
}
