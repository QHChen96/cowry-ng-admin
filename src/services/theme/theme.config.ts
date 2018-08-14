import { Injectable } from '@angular/core';
import { HttpClientConfig } from '@service/http/http.config';

@Injectable({
  providedIn: 'root'
})
export class CowryThemeConfig {
  http?: HttpClientConfig;
}