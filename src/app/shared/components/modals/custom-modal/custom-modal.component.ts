import {Component, Inject} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions, MatDialogClose
} from '@angular/material/dialog';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {Event} from '../../../../pages/appoinment/appoinment.component'


// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    FormsModule, ReactiveFormsModule, MatDatepickerToggle, MatDatepicker
  ],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent {
  component: string | undefined;
  appointmentForm = new FormGroup({
    id: new FormControl(0),
    title    : new FormControl(''),
    description    : new FormControl(''),
    date : new FormControl(new Date),
  });
  constructor(
    public dialogRef: MatDialogRef<CustomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {component: string, data: Event},
    private _dialog: MatDialog,
  ) {
    if (data?.component || data?.data){
      this.component = data?.component;
      this.appointmentForm.patchValue({
        id: data?.data?.id,
        title: data?.data?.title,
        description: data?.data?.description,
        date: data?.data?.date,
      });
    }
  }
  closepup_dialbox(){
    this._dialog.closeAll();
    this.dialogRef.close()
  }

  submitForm(){
    switch (this.component){
      case "Appointment":
        this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
