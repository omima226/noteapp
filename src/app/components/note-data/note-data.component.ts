import jwtDecode from 'jwt-decode';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss'],
})
export class NoteDataComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _Note: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _MatDialogRef: MatDialogRef<NoteDataComponent>
  ) {}

  noteForm: FormGroup = this._fb.group({
    title: [this.data ? this.data.noteData.title : '', [Validators.required]],
    desc: [this.data ? this.data.noteData.desc : '', [Validators.required]],
    token: localStorage.getItem('_tokenNote'),
  });

  userData: any;
  oldData: any = {};

  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem('_tokenNote')!);
    this.oldData = JSON.stringify(this.noteForm.value);
    console.log(this.oldData);
  }

  noteSubmit(formData: FormGroup): void {
    if (formData.valid) {
      if (!this.data) {
        this.addNote();
      } else {
        this.updateNote();
      }
    }
  }

  addNote(): void {
    this._Note
      .addNote({ ...this.noteForm.value, citizenID: this.userData._id })
      .subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.noteForm.reset();
            this._MatDialogRef.close('add');
          }
        },
      });
  }

  updateNote(): void {
    const newData: string = JSON.stringify(this.noteForm.value);
    if (this.oldData !== newData) {
      this._Note
        .updateNote({ ...this.noteForm.value, NoteID: this.data.noteData._id })
        .subscribe({
          next: (response) => {
            if (response.message === 'updated') {
              this.noteForm.reset();
              this._MatDialogRef.close('updated');
            }
          },
        });
    } else {
      this._MatDialogRef.close();
    }
  }
}
