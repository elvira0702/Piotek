import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {dateValidator} from '../../validators/Validators';
import {isNumber} from 'util';
import {Todo} from '../../domain/entities';
import {Observable, Subscription} from 'rxjs';
import {TodoService} from './todo.service';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {FETCH_FROM_API} from '../../actions/todo.actions';

declare var $: any;

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit, DoCheck, OnDestroy {

  toDoForm: FormGroup;
  isList = true;
  flag = false;
  listPage = 1;
  pageArr: Array<number> = [];
  currInterval;
  desc;
  things = '';
  time = '';
  date = '';
  timeGap = [];
  toDoList: Todo[];
  pageList: Todo[];
  toDo: Todo;
  userId: string;
  editId;
  todos: Observable<Todo[]>;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private todoService: TodoService,
              private store$: Store<AppState>) {
    this.toDoForm = fb.group({
      things: ['', [Validators.required, Validators.maxLength(20)]],
      setTime: fb.group({
        date: ['', [Validators.required, Validators.pattern(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)]],
        time: ['', [Validators.required, Validators.pattern(/^([1-9]|1[0-2]):([0-5][0-9])\s(AM|PM)$/)]]
      }, {validator: dateValidator})
    });
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos()
      .flatMap(todos => {
        this.store$.dispatch({type: FETCH_FROM_API, payload: todos});
        return this.store$.select('todos');
      }).startWith([]);
    this.subscription = this.todos.subscribe(todos => {
      this.pageArr.length = Math.ceil(todos.length / 8);
      this.toDoList = todos.sort((a, b) => {
        return b.id - a.id;
      });
      this.getPageList();
    });
  }

  ngDoCheck(): void {
    if (this.isList === false && !this.flag) {
      $('#datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
      });
      $('.timepicker').timepicker({
        showInputs: false
      });
      this.flag = true;
    }
    if (this.date !== $('#datepicker').val() && $('#datepicker')) {
      this.date = $('#datepicker').val();
      this.toDoForm.get('setTime.date').reset(this.date);
    }
    if (this.time !== $('.timepicker').val() && $('.timepicker')) {
      this.time = $('.timepicker').val();
      this.toDoForm.get('setTime.time').reset(this.time);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPageList() {
    this.timeGap = this.getTimeGap(this.toDoList);
    clearInterval(this.currInterval);
    this.currInterval = setInterval(function () {
      this.timeGap = this.getTimeGap(this.toDoList);
    }.bind(this), 60000);
  }

  getTimeGap(list, timeGap = []) {
    let arr;
    if (this.listPage === this.pageArr.length) {
      arr = list.slice((this.listPage - 1) * 8, list.length);
    } else {
      arr = list.slice((this.listPage - 1) * 8, this.listPage * 8);
    }
    this.pageList = arr;
    arr.forEach(todo => {
      const dateArr = todo.date.split('/');
      const timeArr = todo.time.substring(0, 5).split(':');
      const range = todo.time.substr(-2);
      let hour;
      if (range === 'AM') {
        hour = timeArr[0];
      } else {
        hour = parseInt(timeArr[0]) + 12;
      }
      const setTime = new Date(dateArr[2], dateArr[0] - 1, dateArr[1], hour, timeArr[1], 0);
      let gap: any = setTime.getTime() - new Date().getTime();
      let style;
      if (gap >= 86400000) {
        gap = Math.floor(gap / 86400000) + ' days';
        style = 'label-success';
      } else if (gap >= 3600000) {
        gap = Math.floor(gap / 3600000) + ' hours';
        style = 'label-warning';
      } else if (gap >= 60000) {
        gap = Math.floor(gap / 60000) + ' mins';
        style = 'label-danger';
      } else {
        gap = 'time out!';
        style = 'label-danger';
      }
      timeGap.push([gap, style]);
    });
    return timeGap;
  }

  save() {
    const valid = dateValidator(this.toDoForm.get('setTime') as FormGroup);
    if (valid) {
      this.desc = valid.date.desc;
    } else {
      const things = this.toDoForm.get('things').value;
      const date = this.toDoForm.get('setTime.date').value;
      const time = this.toDoForm.get('setTime.time').value;
      this.toDo = {
        id: 0,
        userId: this.userId,
        date: date,
        time: time,
        thing: things,
        isDone: false
      };
      if (this.editId) {
        this.toDo.id = this.editId;
        this.todoService.updateTodo(this.toDo);
        this.editId = null;
      } else {
        this.todoService.addTodo(this.toDo);
      }
      this.isList = true;
      this.listPage = 1;
    }
  }

  editToDo(todo?: Todo) {
    this.isList = false;
    if (todo) {
      this.userId = todo.userId;
      this.editId = todo.id;
      this.things = todo.thing;
      this.date = todo.date;
      this.time = todo.time;
    } else {
      this.editId = null;
      const date = new Date();
      let hours = 24;
      let range = 'AM';
      this.things = '';
      if (hours > 12) {
        range = 'PM';
        hours -= 12;
      }
      if (hours < 10) {
        this.time = '0' + hours + ':00 ' + range;
      } else {
        this.time = hours + ':00 ' + range;
      }
      this.date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
    this.toDoForm.reset({
      things: this.things,
      setTime: {
        date: this.date,
        time: this.time
      }
    });
  }

  deleteToDo(todo: Todo) {
    this.todoService.removeTodo(todo);
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo);
  }

  changePage(value: any) {
    if (value === 'prev' && this.listPage > 1) {
      this.listPage -= 1;
      this.getPageList();
    } else if (value === 'next' && this.listPage != this.pageArr.length) {
      this.listPage += 1;
      this.getPageList();
    } else if (isNumber(value)) {
      this.listPage = value;
      this.getPageList();
    }
  }
}

