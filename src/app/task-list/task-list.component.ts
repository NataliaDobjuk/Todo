import { Component, OnInit, DoCheck } from '@angular/core';
import { Task } from "../task"
import { TaskService } from '../task.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, DoCheck {

  newTask: Task;
  changed: boolean = false;
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    this.newTask = new Task(null,null);
  }

  ngDoCheck() {
    if(this.changed) {
      this.getTasks();
    }
    
  }

   getTasks(): void {

    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
      this.changed = false;
  }

  add(value: string): void {
    
    
    value = value.trim();
    if (!value) { return; }
    this.newTask.taskValue = value;
    this.taskService.addTask(this.newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.changed = true;
      });
  }
 
  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

}
