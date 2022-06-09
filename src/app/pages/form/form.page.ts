import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../services/note.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit, ViewWillEnter {

  public noteForm: FormGroup;

  private id: string;


  constructor(private noteService: NoteService,
              private router: Router,
              private currentRoute: ActivatedRoute) {


  }

  ngOnInit() {
    this.ionViewWillEnter();
    this.currentRoute.paramMap.subscribe(
      (data) => {
        this.id = data.get('id');

        const note = this.noteService.getNote(this.id);

        this.noteForm = new FormGroup<any>({
          title: new FormControl(note.title, {validators: [
              Validators.required
            ]}),
          text: new FormControl(note.text, {validators: [
              Validators.required
            ]})
        });

        //this.noteForm.value.title = note.title;

        console.log(this.noteForm);
      }
    );

  }

  onValidForm(){
    if(this.noteForm.status === 'VALID'){
      this.noteService.addNewNote(this.noteForm.value);
      this.router.navigateByUrl('/home');
    }
  }

  ionViewWillEnter(){
    this.noteForm = new FormGroup<any>({
      title: new FormControl(null, {validators: [
          Validators.required
        ]}),
      text: new FormControl(null, {validators: [
          Validators.required
        ]})
    });
  }

}
