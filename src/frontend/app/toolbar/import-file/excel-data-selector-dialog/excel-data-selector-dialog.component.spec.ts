import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DataMatrix } from "src/frontend/app/core";
import { ExcelDataSelectorDialogComponent } from "./excel-data-selector-dialog.component";


fdescribe("Given an excel-data-selector-dialog component", () => {
    let fixture: ComponentFixture<ExcelDataSelectorDialogComponent>;
    let component: ExcelDataSelectorDialogComponent;

    let dialogCloseSpy: jasmine.Spy;

    const matDialogDataStub: Partial<DataMatrix> = [
        { a: "a0", b: "b0", c: "c0" },
        { a: "a1", b: "b1", c: "c1" },
        { a: "a2", b: "b2", c: "c2" },
        { a: "a3", b: "b3", c: "c3" }
    ];
    const matDialogRefStub: Partial<MatDialogRef<ExcelDataSelectorDialogComponent>> = {
        close(arg?) {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ExcelDataSelectorDialogComponent ],
            imports: [ 
                MatFormFieldModule,
                MatInputModule,
                MatTableModule,
                ReactiveFormsModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: matDialogDataStub },
                { provide: MatDialogRef, useValue: matDialogRefStub },
                { provide: FormBuilder, useClass: FormBuilder }
            ],
        });
    
        fixture = TestBed.createComponent(ExcelDataSelectorDialogComponent);
        component = fixture.componentInstance;
        
        const matDialogRef = fixture.debugElement.injector.get(MatDialogRef);
        dialogCloseSpy = spyOn(matDialogRef, "close");
    });

    describe("when initialized", () => {
        function getControl(selector: string): FormControl {
            switch (selector) {
                case "#from-row":
                    return component.fromRowControl;
                case "#to-row":
                    return component.fromRowControl;
                case "#from-column":
                    return component.fromRowControl;
                case "#to-column":
                default:
                    return component.fromRowControl;
            }
        }
        const testData = [
            { name: "from row", selector: "#from-row"},
            { name: "to row", selector: "#to-row" },
            { name: "from column", selector: "#from-column" },
            { name: "to column", selector: "#to-column" },
        ];
        testData.forEach(data => {
            it(`then ${data.name} control value is 1`, () => {
                expect(getControl(data.selector).value).toBe(1);
            });

            describe(`and ${data.name} value is bigger than max then`, () => {
                beforeEach(() => {
                    getControl(data.selector).setValue(matDialogDataStub.length);
                    fixture.detectChanges();
                });

                it("form is invalid", () => {
                    expect(component.form.valid).toBeFalse();
                });
                it("range error is rendered", () => {
                    const errorElement: HTMLElement = fixture.nativeElement.querySelector(`${data.selector}__error--range`);
                    expect(errorElement).toBeDefined();
                });
                it("required error is NOT rendered", () => {
                    const errorElement: HTMLElement = fixture.nativeElement.querySelector(`${data.selector}__error--required`);
                    expect(errorElement).toBeNull();
                });
            });

            describe(`and ${data.name} value is less than min then`, () => {
                beforeEach(() => {
                    getControl(data.selector).setValue(0);
                    fixture.detectChanges();
                });

                it("form is invalid", () => {
                    expect(component.form.valid).toBeFalse();
                });
                it("range error is rendered", () => {
                    const errorElement: HTMLElement = fixture.nativeElement.querySelector(`${data.selector}__error--range`);
                    expect(errorElement).toBeDefined();
                });
                it("required error is NOT rendered", () => {
                    const errorElement: HTMLElement = fixture.nativeElement.querySelector(`${data.selector}__error--required`);
                    expect(errorElement).toBeNull();
                });
            });

            describe(`and ${data.name} value undefined`, () => {
                beforeEach(() => {
                    getControl(data.selector).setValue(undefined);
                    fixture.detectChanges();
                });

                it("form is invalid", () => {
                    expect(component.form.valid).toBeFalse();
                });
                it("range error is NOT rendered", () => {
                    const errorElement: HTMLElement = fixture.nativeElement.querySelector(`${data.selector}__error--range`);
                    expect(errorElement).toBeNull();
                });
                it("required error is rendered", () => {
                    const errorElement: HTMLElement = fixture.nativeElement.querySelector(`${data.selector}__error--required`);
                    expect(errorElement).toBeDefined();
                });
            });
        });
        
        it("and import is clicked then dialog is closed with selected data", () => {
            const importButton = fixture.nativeElement.querySelector("#import");

            importButton.click();

            expect(dialogCloseSpy).toHaveBeenCalledWith(matDialogDataStub);
        });

        it("and close is clicked then dialog is cancel with undefined data", () => {
            const cancelButton = fixture.nativeElement.querySelector("#cancel");

            cancelButton.click();

            expect(dialogCloseSpy).toHaveBeenCalledWith(undefined);
        });

        testData.forEach(data => {
            it(`and ${data.name} values change then on import new selection is passed`, () => {
                getControl(data.selector).setValue(2);

                fixture.detectChanges();
                component.import();

                expect(dialogCloseSpy).not.toHaveBeenCalledWith(matDialogDataStub);
            });
        });
    });
});