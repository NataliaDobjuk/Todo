import { Component, OnInit, DoCheck } from '@angular/core';
import { Task } from "../task"
import { TaskService } from '../task.service';

import { Observable } from 'rxjs/Observable';
import { TaskLiatAnimate } from './task-list.animation';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [TaskLiatAnimate]
})
export class TaskListComponent implements OnInit, DoCheck {

  selectedTask: Task;
  tasks: Task[];
 

  
  onMouseEnter(task: Task) {
    this.selectedTask = task;
  }

   
  onMouseLeave() {
    this.selectedTask = new Task(null,null);
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    this.selectedTask = new Task(null,null);
  }

  ngDoCheck() {
    if(this.taskService.changed) {
      this.getTasks();
    }
  }

   getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

   delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }
  getState(task: Task): string {
    if(this.selectedTask.id){
      return this.selectedTask === task ? 'active' : 'inactive';
    }  else return 'inactive';
  }

}
