import { Injectable } from '@angular/core';
import { 
  HttpHeaders, 
  HttpParams, 
  HttpResponse, 
  HttpClient 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClientConfig } from './http.config';
import { CowryThemeConfig } from '../../theme.config';
/**
 * 封装http
 */
@Injectable({
  providedIn: 'root'
})
export class _HttpClient {
  private cfg: HttpClientConfig;
  constructor(private http: HttpClient, cfg: CowryThemeConfig) {
    this.cfg = Object.assign(
      <HttpClientConfig>{
        nullValueHandling: 'include',
        dateValueHandling: 'timestamp'
      },
      cfg!.http
    )
  }
  private _loading = false;
  
  get loading(): boolean {
    return this._loading;
  }

  parseParam(params: any): HttpParams {
    let ret = new HttpParams();
    Object.keys(params).forEach(key => {
      let _data = params[key];
      if (this.cfg.nullValueHandling == 'ignore' && _data == null) return;
      if (this.cfg.dateValueHandling == 'timestamp' && _data instanceof Date) {
        _data = _data.valueOf();
      }
      ret = ret.set(key, _data);
    });
    return ret;
  }
  appliedUrl(url: string, params?: any) {
    if (!params) return url;
    url += ~url.indexOf('?') ? '' : '?';
    const arr: string[] = [];
    for (const key in params) {
      arr.push(`${key}=${params[key]}`);
    }
    return url + arr.join('&');
  }
  begin() {
    setTimeout(() => (this._loading = true));
  }
  end() {
    setTimeout(() => {this._loading = false});
  }

  get<T>(
    url: string, 
    params?: any, 
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T>;

  get(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    }
  ): Observable<string>;

  get(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<HttpResponse<Object>>;

  get<T>(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<HttpResponse<T>>;

  get(
    url: string, 
    params?: any, 
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any>;

  get(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any> {
    return this.request(
      'GET',
      url,
      Object.assign(
        {
          params
        },
        options
      )
    );
  }

  post(
    url: string, 
    body: any, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    }
  ): Observable<string>;

  post(
    url: string, 
    body: any, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<HttpResponse<Object>>;

  post<T>(
    url: string, 
    body?: any, 
    params?: any, 
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T>;

  post(
    url: string, 
    body?: any, 
    params?: any, 
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any>;

  post(
    url: string, 
    body: any, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any> {
    return this.request(
      'POST',
      url,
      Object.assign(
        {
          body,
          params
        },
        options
      )
    )
  }

  delete(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    }
  ): Observable<string>;

  delete(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<HttpResponse<Object>>;

  delete(
    url: string, 
    params?: any, 
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any>;

  delete(
    url: string, 
    params: any, 
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any> {
    return this.request(
      'DELETE',
      url,
      Object.assign(
        {
          params
        },
        options
      )
    )
  }

  jsonp(
    url: string, 
    params?: any, 
    callbackParam: string = 'JSON_CALLBACK'
  ): Observable<any> {
    return this.http.jsonp(this.appliedUrl(url, params), callbackParam).pipe(
      tap(() => {
        this.end();
      }),
      catchError(res => {
        this.end();
        return throwError(res);
      })
    );
  }

  patch(
    url: string, 
    body?: any, 
    params?: any
  ): Observable<any> {
    return this.request(
      'PATCH',
      url,
      Object.assign({
        params,
        body: body || null
      })
    );
  }

  put(
    url: string, 
    body?: any, 
    params?: any
  ): Observable<any> {
    return this.request(
      'PUT',
      url,
      Object.assign({
        params,
        body: body || null
      })
    )
  }

  request<R>(
    method: string, 
    url: string, 
    options?: {
      body?: any;
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      reportProgress?: boolean;
      withCredentials?: boolean;
    }
  ): Observable<R>;

  request(
    method: string, 
    url: string, 
    options?: {
      body?: any;
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      reportProgress?: boolean;
      withCredentials?: boolean;
    }
  ): Observable<any> {
    this.begin();
    if (options) {
      if (options.params) options.params = this.parseParam(options.params);
    }
    return this.http.request(method, url, options).pipe(
      tap(() => {
        this.end()
      }),
      catchError(res => {
        this.end();
        return throwError(res);
      })
    )
  }

}