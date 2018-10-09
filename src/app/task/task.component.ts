import {ITask} from './task';
import {TaskService} from './task.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  pageTitle: string = "To-Do's";
  _taskFilter: string;
  errorMessage: string;
  get taskFilter() {
    return this._taskFilter;
  }
  set taskFilter(value: string) {
    this._taskFilter = value;
    this.filteredTasks = this.taskFilter ? this.performFilter(this._taskFilter) : this.tasks;
  }
  filteredTasks: ITask[];
  tasks: ITask[];

  performFilter(filterBy: string): ITask[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: ITask) =>
      task.status.toLocaleLowerCase().indexOf(filterBy) != -1);
  }
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchData();
  }

  createTask(){
  
  }
  
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      () => this.fetchData()
    );
  }

  isCheckBoxDisabled(task: ITask): boolean {
    if (task.status == "COMPLETED") {
      return true;
    } else {
      return false;
    }
  }
  changeStatus(id: number, task: ITask) {
    let copyTask = Object.assign({}, task);
    copyTask.status = "COMPLETED"; //making it as completed
    this.taskService.changeStatus(id, copyTask).subscribe(
      updatedTask => {
        const foundIndex = this.tasks.findIndex(t => t.id == updatedTask.id);
        this.tasks[foundIndex] = updatedTask;
      });
  }
  fetchData() {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      },
      error => this.errorMessage = <any>error
    );

  }

}
