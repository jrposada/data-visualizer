import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;

describe('AboutComponent (highlightDirective)', () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas:      [ NO_ERRORS_SCHEMA ]
        })
        .createComponent(AppComponent);

        fixture.detectChanges(); // initial binding
    });

    it('should have a <h1> with value "Electron app with Angular"', () => {
        const h2: HTMLElement = fixture.nativeElement.querySelector('h1');
        const text = h2.textContent;
        expect(text).toBe("Electron app with Angular");
    });
});