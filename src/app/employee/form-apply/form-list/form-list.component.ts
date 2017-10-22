import {Component, OnInit} from '@angular/core';
import {FormService} from '../form.service';
import {isNumber} from 'util';
import {AppState} from '../../../domain/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FETCH_FROM_API} from '../../../actions/form.actions';
import {Form} from '../../../domain/entities';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  public forms: Observable<Form[]>;
  public formList: Form[];
  public pageList: Form[];
  public form: Form;
  pageArr: Array<number> = [];
  page = 1;
  loading = false;
  showDetail = false;

  constructor(private formService: FormService, private store$: Store<AppState>) {
  }

  ngOnInit() {
    this.forms = this.formService.getFormList()
      .flatMap(forms => {
        this.store$.dispatch({type: FETCH_FROM_API, payload: forms});
        return this.store$.select('forms');
      }).startWith([]);
    this.forms.subscribe(formList =>{
      this.formList = formList;
      this.formList.reverse();
      this.pageArr.length = formList.length;
      this.getPageList();
    })
  }

  getPageList(){
    const formList = this.formList;
    if (this.page === this.pageArr.length) {
      this.pageList = formList.slice((this.page - 1) * 10, formList.length)
    } else {
      this.pageList = formList.slice((this.page - 1) * 10, this.page * 10)
    }
  }

  changePage(value:any){
    if(isNumber(value)) {
      this.page = value;
      this.getPageList();
      return;
    }
    if (value === 'prev' && this.page > 1) {
      this.page -= 1;
      this.getPageList();
      return;
    } else if (value === 'next' && this.page!=this.pageArr.length) {
      this.page += 1;
      this.getPageList();
    }
  }

  show(form: Form) {
    this.showDetail = true;
    this.form = form;
  }

}
