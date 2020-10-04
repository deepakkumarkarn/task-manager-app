export interface NotificationRequest {
    message:string
    type:string
    duration?:number
    verticalPosition?: string // 'top' | 'bottom'
    horizontalPosition?: string //'start' | 'center' | 'end' | 'left' | 'right'
}
