import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { DataFrame, DataSet } from "src/frontend/app/core";
import { DataService } from "src/frontend/app/services/data/data.service";
import { SelectDataSetDialogComponent } from "./select-data-set-dialog.component";

describe("Given a select-data-set-dialog component", () => {
    let fixture: ComponentFixture<SelectDataSetDialogComponent>;

    let dialogCloseSpy: jasmine.Spy;

    const matDialogRefStub: Partial<MatDialogRef<SelectDataSetDialogComponent>> = {
        close(arg?) {}
    };
    const data: DataSet[] = [
        { id: "id1", dataFrame: new DataFrame(), name: "name1" },
        { id: "id2", dataFrame: new DataFrame(), name: "name2" },
        { id: "id3", dataFrame: new DataFrame(), name: "name3" },
    ];
    const dataServiceStub: Partial<DataService> = {
        data
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ SelectDataSetDialogComponent ],
            providers: [
                { provide: MatDialogRef, useValue: matDialogRefStub },
                { provide: DataService, useValue: dataServiceStub },
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatListModule,
                MatButtonModule
            ]
        });

        fixture = TestBed.createComponent(SelectDataSetDialogComponent);

        const matDialogRef = fixture.debugElement.injector.get(MatDialogRef);
        dialogCloseSpy = spyOn(matDialogRef, "close");

        fixture.detectChanges();
    });

    describe("when submit button is pressed", () => {
        it("and selected data set id is undefined then it button is disabled and dialog close is not called", () => {
            const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector("#select-data-set-dialog__submit");

            submitButton.click();

            expect(submitButton.disabled).toBeTrue();
            expect(dialogCloseSpy).not.toHaveBeenCalled();
        });

        for (let i = 0; i < data.length; i++) {
            it(`and selected data id is option ${i} then dialog close is called with its id`, () => {
                const matListOption: HTMLElement[] = fixture.nativeElement.querySelectorAll("mat-list-option");
                const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector("#select-data-set-dialog__submit");

                matListOption[i].click();
                fixture.detectChanges();

                submitButton.click();

                expect(dialogCloseSpy).toHaveBeenCalledWith(data[i].id);
            });
        }
    });

    it("when cancel button is pressed then dialog close is called with undefined", () => {
        const cancelButton: HTMLElement = fixture.nativeElement.querySelector("#select-data-set-dialog__close");

        cancelButton.click();

        expect(dialogCloseSpy).toHaveBeenCalledWith(undefined);
    });
});
