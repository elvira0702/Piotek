import {FormControl, FormGroup} from '@angular/forms';

export function equalValidator(group: FormGroup): any {
  const password: FormControl = group.get('password') as FormControl;
  const pConfirm: FormControl = group.get('pConfirm') as FormControl;

  let valid = false;
  if (password && pConfirm) {
    valid = (password.value === pConfirm.value);
  }
  return valid ? null : {equal: {desc: '密码和确认密码不匹配！'}};
}

export function checkValidator(control: FormControl): any {
  let valid = false;
  if (control.value) {
    valid = true;
  }
  return valid ? null : {checked: {desc: ''}};
}

export function dateValidator(group: FormGroup): any {
  const date: FormControl = group.get('date') as FormControl;
  const time: FormControl = group.get('time') as FormControl;
  let valid = false;
  if (date && time) {
    const currDate = new Date();
    const dateArr = date.value.split('/');
    const timeArr = time.value.substring(0, 5).split(':');
    const range = time.value.substr(-2);
    let hour;
    if (range === 'AM') {
      hour = timeArr[0];
    } else {
      hour = parseInt(timeArr[0]) + 12;
    }
    const setDate = new Date(dateArr[2], dateArr[0] - 1, dateArr[1], hour, timeArr[1], 0);
    const second = setDate.getTime() - currDate.getTime();
    valid = (second >= 0);
  }
  return valid ? null : {date: {desc: '设定时间不可早于当前时间！'}};
}
