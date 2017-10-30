import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ImgData} from './image-crop.component';
import {environment} from '../../../../environments/environment';
import {error} from 'util';

@Injectable()
export class ImageService {
  private api_url = environment.apiUrl + 'api/imgData';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  upLoadImg(imgData: ImgData): Observable<string> {
    return this.http.post(this.api_url, JSON.stringify(imgData), {headers: this.headers})
      .map(res => {
        if (res.json()===-1){
          alert('服务器出错，请稍后再试！');
          return '0';
        }else {
          return res.json();
        }
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
