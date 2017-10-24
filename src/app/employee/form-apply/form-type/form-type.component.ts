import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../form.service';
import {timeValidator} from '../../../validators/Validators';
import {Auth, Form, UserInfo} from '../../../domain/entities';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../../../domain/state';
import {Store} from '@ngrx/store';

declare var $: any;

@Component({
  selector: 'app-form-type',
  templateUrl: './form-type.component.html',
  styleUrls: ['./form-type.component.css']
})
export class FormTypeComponent implements OnInit, DoCheck, OnDestroy {

  public type;
  auth$: Observable<Auth>;
  currUser: UserInfo;
  hiredate;
  atJob;
  formInfo: Form = {id: '', userId: '', type: '', state: '', time: '', reason: ''};
  date = new Date();
  year = this.date.getFullYear();
  month = (this.date.getMonth() + 1) < 10 ? '0' + (this.date.getMonth() + 1) : '' + (this.date.getMonth() + 1);
  day = this.date.getDate() < 10 ? '0' + this.date.getDate() : '' + this.date.getDate();
  currDate = this.month + '/' + this.day + '/' + this.year;
  quitDate;
  outTime;
  returnTime;
  holiTime;
  formDate = this.year + this.month + this.day;
  formNumber: string;
  holiType = ['事假', '年假', '病假', '婚假', '产假', '丧假'];
  holitype = this.holiType[0];
  public quitForm: FormGroup;
  public outForm: FormGroup;
  public holiForm: FormGroup;
  subscription: Subscription;

  constructor(private routeInfo: ActivatedRoute, private fb: FormBuilder,
              private formService: FormService, private store$: Store<AppState>) {
    this.quitForm = fb.group({
      quitDate: ['', [Validators.required, Validators.pattern(/^(0[1-9])|1[0-2]\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/[0-9]{4}$/)]],
      quitReason: ['', Validators.required]
    });
    this.outForm = fb.group({
      timeArea: fb.group({
        outTime: ['', [Validators.required, Validators.pattern(/^(0[0-9]|1[0-2]):([0-5][0-9])\s(AM|PM)$/)]],
        returnTime: ['', [Validators.required, Validators.pattern(/^(0[0-9]|1[0-2]):([0-5][0-9])\s(AM|PM)$/)]]
      }, {validator: timeValidator}),
      outFor: ['', Validators.required]
    });

    this.holiForm = fb.group({
      holiTime: ['', Validators.required],
      holiFor: ['', Validators.required]
    });
    this.auth$ = store$.select(appState => appState.auth);
    this.subscription = this.auth$.subscribe(auth => {
      if (auth.user) {
        this.currUser = auth.user;
        this.hiredate = auth.user.hiredate;
        const arr = this.hiredate.split('-');
        this.atJob = (this.date.getFullYear() - arr[0]) + (this.date.getMonth() + 1 - arr[1]) * 0.1;
      }
    });
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.type = params['type'];
    });
    this.formService.getFormNumber(this.formDate, (data) => {
      this.formNumber = data;
    });
    $('.timepicker').timepicker({
      showInputs: false
    });
    $('#datepicker').datepicker({
      autoclose: true,
      todayHighlight: true
    });
    $('#reservationtime').daterangepicker({
      timePicker: true,
      dateLimit: true,
      locale: {
        format: 'MM/DD/YYYY h:mm A'
      }
    });
  }

  ngDoCheck(): void {
    if (this.quitDate !== $('#datepicker').val() && $('#datepicker')) {
      this.quitDate = $('#datepicker').val();
      this.quitForm.get('quitDate').reset(this.quitDate);
    }
    if (this.outTime !== $('#outTime').val() && $('#outTime')) {
      this.outTime = $('#outTime').val();
      this.outForm.get('timeArea.outTime').reset(this.outTime);
    }
    if (this.returnTime !== $('#returnTime').val() && $('#returnTime')) {
      this.returnTime = $('#returnTime').val();
      this.outForm.get('timeArea.returnTime').reset(this.returnTime);
    }
    if (this.holiTime !== $('#reservationtime').val() && $('#reservationtime')) {
      this.holiTime = $('#reservationtime').val();
      this.holiForm.get('holiTime').reset(this.holiTime);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.formInfo.userId = this.currUser.userId;
    this.formInfo.state = '申请中';
    switch (this.type) {
      case 'quit':
        this.formInfo.type = '离职单';
        this.formInfo.time = this.quitForm.get('quitDate').value;
        this.formInfo.reason = this.quitForm.get('quitReason').value;
        break;
      case 'out':
        this.formInfo.type = '外出单';
        this.formInfo.time = this.currDate + ' ' + this.outForm.get('timeArea.outTime').value + '-' + this.outForm.get('timeArea.returnTime').value;
        this.formInfo.reason = this.outForm.get('outFor').value;
        break;
      case 'holiday':
        this.formInfo.type = '请假单（' + this.holitype + '）';
        this.formInfo.time = this.holiForm.get('holiTime').value;
        this.formInfo.reason = this.holiForm.get('holiFor').value;
        break;
      default:
        return;
    }
    this.formService.getFormNumber(this.formDate, (data) => {
      this.formInfo.id = data;
      this.formService.addForm(this.formInfo);
    });
  }

}
