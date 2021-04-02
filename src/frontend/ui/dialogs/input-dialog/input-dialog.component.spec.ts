// TODO

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { InputDialogOptions } from "../..";
import { InputDialogComponent } from "./input-dialog.component";

fdescribe("Given an input-dialog component", () => {
    let fixture: ComponentFixture<InputDialogComponent>;
    let component: InputDialogComponent;

    let dialogCloseSpy: jasmine.Spy;

    const matDialogDataStub: Partial<InputDialogOptions> = {};
    const matDialogRefStub: Partial<MatDialogRef<InputDialogComponent>> = {
        close(arg?) {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ InputDialogComponent ],
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: matDialogDataStub },
                { provide: MatDialogRef, useValue: matDialogRefStub },
            ]
        });

        matDialogDataStub.title = "title";
        matDialogDataStub.description = "description";
        matDialogDataStub.placeholder = "placeholder";
        matDialogDataStub.submit = "submit";
        matDialogDataStub.close = "close";

        fixture = TestBed.createComponent(InputDialogComponent);
        component = fixture.componentInstance;

        const matDialogRef = fixture.debugElement.injector.get(MatDialogRef);
        dialogCloseSpy = spyOn(matDialogRef, "close");

        fixture.detectChanges();
    });

    const nullOrUndefinedOrEmptyData = [
        "",
        undefined,
        null
    ];
    nullOrUndefinedOrEmptyData.forEach(data => {
        it(`when input control has is ${data} then submit button is disabled`, () => {
            const submitElement: HTMLButtonElement = fixture.nativeElement.querySelector("#input-dialog__submit");
            component.inputControl.setValue(data);

            submitElement.click();

            expect(submitElement.disabled).toBeTrue();
            expect(dialogCloseSpy).not.toHaveBeenCalled();
        });
    });

    it("when click in submit button then dialog close is called with input value", () => {
        const expectedValue = "test name";

        const submitElement: HTMLElement = fixture.nativeElement.querySelector("#input-dialog__submit");
        component.inputControl.setValue(expectedValue);
        fixture.detectChanges();

        submitElement.click();

        expect(dialogCloseSpy).toHaveBeenCalledWith(expectedValue);
    });

    it("when click in close button then dialog close is called with undefined", () => {
        const closeElement: HTMLElement = fixture.nativeElement.querySelector("#input-dialog__close");

        closeElement.click();

        expect(dialogCloseSpy).toHaveBeenCalledWith(undefined);
    });

    it("when description is not defined then it is not rendered", () => {
        matDialogDataStub.description = undefined;
        fixture.detectChanges();

        const descriptionElement: HTMLElement = fixture.nativeElement.querySelector("#input-dialog__description");

        expect(descriptionElement).toBeNull();
    });

    it("when description is defined then it is rendered", () => {
        const descriptionElement: HTMLElement = fixture.nativeElement.querySelector("#input-dialog__description");

        expect(descriptionElement).not.toBeNull();
    });
});
