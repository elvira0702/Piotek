import {PreloadingStrategy, Route } from "@angular/router";
import {Observable} from 'rxjs/RX';
/**
 * 预加载策略
 */
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    //当路由中配置data: {preload: true}时预加载
    return route.data && route.data && route.data['preload'] ? load() : Observable.of(null);
  }
}

