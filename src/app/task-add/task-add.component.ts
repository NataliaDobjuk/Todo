import { Component, OnInit } from '@angular/core';
import { Task } from "../task"
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
 
   newTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.newTask = new Task(null,null);
  }
  

  add(value: string): void {
    value = value.trim();
    if (!value) { return; }

    this.newTask.taskValue = value;
    this.taskService.addTask(this.newTask).subscribe();
  }
}
