import { TaskClass } from './task-class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  submitted = false;
  onSubmit(){this.submitted = true}
  taskObject = new TaskClass();
  
  constructor() { }

  ngOnInit() {
  }

}
