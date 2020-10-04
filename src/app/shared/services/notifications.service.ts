import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationRequest } from '../models/notification-request.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  showNotification(options: NotificationRequest) {
    let color: string = this.getColor(options.type);
    let config: any = {
      panelClass: [color],
    };
    if (options.horizontalPosition && options.verticalPosition !== null)
      config['verticalPosition'] = options.verticalPosition;

    if (options.horizontalPosition && options.horizontalPosition !== null)
      config['horizontalPosition'] = options.horizontalPosition;

    config['duration'] = options.duration;
    this._snackBar.open(options.message, 'Close', config);
  }

  getColor(type: any) {
    switch (type) {
      case 'error':
        return 'red-snackbar';
      case 'info':
        return 'black-snackbar';
      default:
        return 'blue-snackbar';
    }
  }
}
