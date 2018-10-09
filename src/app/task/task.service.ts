import {ITask} from './task';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'No Auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = "http://localhost:8080/";
  private createTaskURL = "add";
  private deleteTaskURL = "delete/";
  private updateTaskURL = "update/";
  private showAllTasksURL = "showAllTasks";


  constructor(private http: HttpClient) {}

  deleteTask(id: number): Observable<{}> {
    return this.http.delete(this.baseURL + this.deleteTaskURL + id).pipe(
      catchError(this.handleError));
  }

  changeStatus(id: number, task:ITask): Observable<ITask> {
    return this.http.put<ITask>(this.baseURL + this.updateTaskURL + id, task, httpOptions).pipe(
      catchError(this.handleError));
  }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseURL + this.showAllTasksURL).pipe(
      tap(data => console.log('All : ' + JSON.stringify(data))),
      catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned the error code ${err.status} and message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
