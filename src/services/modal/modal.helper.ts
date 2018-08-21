import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NzModalService, ModalOptionsForService } from 'ng-zorro-antd';

export interface ModalHelperOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number;
  /** 对话框 `ModalOptionsForService` 参数 */
  modalOptions?: ModalOptionsForService;
  /** 是否精准 (默认: `true`), 若返回非空值(`null 或 undefined`) */
  exact?: boolean;
  /** 是否包裹标签页 */
  includeTabs?: boolean;
}

/** 对话框辅助类 */
@Injectable({ providedIn: 'root' })
export class ModalHelper {
  private zIndex = 500;

  constructor(private srv: NzModalService) {}

  /**
   * 创建一个对话框
   * 
   * @param comp 
   * @param params 
   * @param options 
   */
  create(
    comp: any,
    params?: any,
    options?: ModalHelperOptions
  ): Observable<any> {
    options = Object.assign({
      size: 'lg',
      exact: true,
      includeTabs: false
    }, options);
    return Observable.create((observer: Observer<any>) => {
      let cls = '',
        width = '';
      if (options.size) {
        if (typeof options.size === 'number') {
          width = `${options.size}px`;
        } else {
          cls = `modal-${options.size};`
        }
      }
      if (options.includeTabs) {
        cls += ' modal-include-tabs';
      }
      const defaultOptions: ModalOptionsForService = {
        nzWrapClassName: cls,
        nzContent: comp,
        nzWidth: width ? width : undefined,
        nzFooter: null,
        nzComponentParams: params,
        nzZIndex: ++this.zIndex
      };
      const subject = this.srv.create(
        Object.assign(defaultOptions, options.modalOptions)
      );
      const afterClose$ = subject.afterClose.subscribe((res: any) => {
        if (options.exact === true) {
          if (res != null) {
            observer.next(res);
          } else {
            observer.error(res);
          }
        } else {
          observer.next(res);
        }
        observer.complete();
        afterClose$.unsubscribe();
      });
    });
  }

  /**
   * 
   * 创建静态框, 点击蒙层不允许关闭
   * @param comp 
   * @param params 
   * @param options 
   */
  createStatic(
    comp: any,
    params?: any,
    options?: ModalHelperOptions
  ): Observable<any> {
    const modalOptions = Object.assign(
      { nzMaskClosable: false },
      options && options.modalOptions
    )
    return this.create(comp, params, Object.assign({}, options, { modalOptions }));
  }

  open(
    comp: any,
    params?: any,
    size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
    options?: ModalOptionsForService
  ): Observable<any> {
    return this.create(comp, params, {
      size,
      modalOptions: options,
      exact: false
    });
  }

  /**
   * 静态框 点击蒙层不允许关闭
   * @param comp 
   * @param params 
   * @param size 
   * @param options 
   */
  static(
    comp: any,
    params?: any,
    size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
    options?: any,
  ): Observable<any> {
    return this.open(
      comp,
      params,
      size,
      Object.assign(
        {
          nzMaskClosable: false
        },
        options
      )
    );
  }
}