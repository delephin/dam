import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[medicionHighlight]'
})
export class MedicionHighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }
}