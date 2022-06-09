import { Component } from '@angular/core';
import {NoteService} from '../../services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public noteService: NoteService) {}

}
