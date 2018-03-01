import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Task } from './task';

import { Observable } from 'rxjs/Observable';
import './rx-js.operators';

@Injectable()
export class TaskService {

  private url = "http://localhost:2403/tasks";

  constructor(private http: Http) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.url)
      .map(this.extractTasks)
      .catch(this.handleError);

  }

  public getTask(id: string): Observable<Task> {
    let taskUrl = this.url + "/" + id;

    return this.http.get(taskUrl)
      .map(this.extraxtTask)
      .catch(this.handleError);
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post(this.url, task)
      .catch(this.handleError);
  }

  public deleteTask(task: Task): Observable<Task> {
    return this.http.delete(this.url + "/" + task.id)
      .catch(this.handleError);
  }


  private extraxtTask(response: Response) {
    let res = response.json();
    let task = new Task(res.id, res.taskValue);
    return task;
  }

  private extractTasks(response: Response) {
    let res = response.json();
    let tasks: Task[] = [];

    for(let i = 0; i< res.length; i++) {
      tasks.push(new Task(res[i].id, res[i].taskValue));
    }
    return tasks;
  }

  private handleError(error: any, caught: Observable<any>): any {
    let message = '';

      if (error instanceof Response) {
        let errorData = error.json().error || JSON.stringify(error.json());
        message = `${error.status} - ${error.statusText || ''} ${errorData}`
      } else {
        message = error.message ? error.message : error.toString();
      }

      console.error(message);

      return Observable.throw(message);
  }

}
