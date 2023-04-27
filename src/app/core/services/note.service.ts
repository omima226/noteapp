import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _Http: HttpClient) {}

  addNote(formData: object): Observable<any> {
    return this._Http.post(environment.baseUrl + 'addNote', formData);
  }

  updateNote(formData: object): Observable<any> {
    return this._Http.put(environment.baseUrl + 'updateNote', formData);
  }

  getUserNote(formData: object): Observable<any> {
    return this._Http.post(environment.baseUrl + 'getUserNotes', formData);
  }

  deleteNote(formData: object): Observable<any> {
    return this._Http.delete(environment.baseUrl + 'deleteNote', {
      body: formData,
    });
  }
}
