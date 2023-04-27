import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _MatDialog: MatDialog, private _Note: NoteService) {}

  value = '';

  userData: any;

  notes: any[] = [];

  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem('_tokenNote')!);
    this.getNotes();
  }

  addData(): void {
    const dialogRef = this._MatDialog.open(NoteDataComponent);
    dialogRef.afterClosed().subscribe({
      next: (repsonse) => {
        if (repsonse === 'add') {
          this.getNotes();
        }
      },
    });
  }

  getNotes(): void {
    const formData = {
      token: localStorage.getItem('_tokenNote'),
      userID: this.userData._id,
    };

    console.log(formData);

    this._Note.getUserNote(formData).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.notes = response.Notes;
        }
      },
    });
  }

  setData(formData: object): void {
    const dialogRef = this._MatDialog.open(NoteDataComponent, {
      data: { noteData: formData },
    });

    dialogRef.afterClosed().subscribe({
      next: (repsonse) => {
        if (repsonse === 'updated') {
          this.getNotes();
        }
      },
    });
  }

  deleteItem(id: string, index: number): void {
    this._Note
      .deleteNote({ NoteID: id, token: localStorage.getItem('_tokenNote') })
      .subscribe({
        next: (response) => {
          if (response.message === 'deleted') {
            this.notes.splice(index, 1);
            this.notes = [...this.notes];
            console.log(this.notes);
          }
        },
      });
  }

  trackFn(index: number, note: any): string {
    return note._id;
  }
}
