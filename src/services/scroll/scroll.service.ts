import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '@service/win.tokens';

@Injectable({ providedIn: 'root' })
export class ScrollService {
	constructor(
		@Inject(WINDOW) private win: any,
		@Inject(DOCUMENT) private doc: any
	) {}

	scrollToElement(element?: Element, topOffset = 0) {
		if (!element) element = this.doc.body;

		element.scrollIntoView();

		const w = this.win;
		if (w && w.scrollBy) {
			w.scrollBy(0, element.getBoundingClientRect().top - topOffset);

			if (w.pageYOffset < 20) {
				w.scrollBy(0, -w.pageYOffset);
			}
		}
	}

	scrollToTop(topOffset = 0) {
		this.scrollToElement(this.doc.body, topOffset);
	}
}