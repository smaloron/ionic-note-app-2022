import { Injectable } from '@angular/core';
import { Storage} from '@capacitor/storage';

export interface NoteInterface {
  title: string;
  id?: number;
  text: string;
}

export class NoteModel implements NoteInterface {
  title: string;
  id: number;
  text: string;

  constructor(data: NoteInterface = null){
    if(data){
      this.title = data.title;
      this.id = data.id;
      this.text = data.text;
    }

    if(! this.id){
      this.id = new Date().getTime();
    }
  }
}

const STORAGE_KEY = 'Notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public noteList: NoteModel[] = [
    new NoteModel({title: 'Une superbe note', text: 'Bla Bla'}),
    new NoteModel({title: 'Une maginfique note', text: 'Bla Bla'}),
    new NoteModel({title: 'Une merveilleuse note', text: 'Bla Bla'}),
  ];

  constructor() {
    Storage.get({key: STORAGE_KEY}).then(
      (data: any) => {
        this.noteList = JSON.parse(data.value) || [];
      }
    );
  }

  addNewNote(note){
    this.noteList.push(
      new NoteModel(note)
    );

    Storage.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.noteList)
    });
  }

  getNote(id): NoteModel{

    const note = this.noteList.filter((item) => item.id == id);

    if( note.length === 0) {
      return new NoteModel();
    } else {
      return  note[0];
    }
  }
}
