import { Renderer2 } from '@angular/core';

function removeClass(
  el: HTMLElement,
  classMap: object,
  renderer: Renderer2
): void {
  for (const i in classMap) {
    renderer.removeClass(el, i);
  }
}

function addClass(
  el: HTMLElement,
  classMap: object,
  renderer: Renderer2
): void {
  for (const i in classMap) {
    if (classMap[i]) {
      renderer.addClass(el, i);
    }
  }
}

export function updateHostClass(
  el: HTMLElement,
  renderer: Renderer2,
  classMap: object,
  cleanAll = false
): void {
  if (cleanAll === true) {
    renderer.removeAttribute(el, 'class');
  } else {
    removeClass(el, classMap, renderer);
  }
  classMap = { ...classMap };
  addClass(el, classMap, renderer);
}