export class TasksDTO{
    title: String;
    description: String;
    dueDate: Date;
    taskStatus: number;
    taskId: number;

    constructor(data: {}) {

        this.taskId = new Date().valueOf();
        
        this.title = data['title'];
        this.description = data['description'];
        this.dueDate = data['dueDate'];
        /*
        Task status:
        1 - Backlog
        2 - Development
        3 - Review
        4 - Acceptance
        */
        this.taskStatus = 1
    }
}