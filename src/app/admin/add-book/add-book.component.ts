import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.addBookForm = new FormGroup({
      'name': new FormControl(null),
      'author': new FormControl(null),
      'price': new FormControl(null)
    });
  }

  onSubmitAddBookForm() {
    console.log(this.addBookForm.value);
  }

}
