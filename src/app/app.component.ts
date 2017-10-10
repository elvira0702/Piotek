import {Component} from '@angular/core';
import {UserInfoService} from './user/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private initStore = true;

  constructor(private userInfoService: UserInfoService) {
    if (this.initStore) {
      userInfoService.buildStorage();
      this.initStore = false;
    }
  }
}
