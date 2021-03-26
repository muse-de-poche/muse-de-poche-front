import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComposerService } from 'src/app/services/composer.service';
import { Composer } from 'src/app/models/composer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  form: FormGroup = this.formBuilder.group(
    {
      pseudo: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }
  );

  constructor(private formBuilder: FormBuilder, private api: ComposerService) { }

  ngOnInit(): void {
  }

  signup() {
    this.api.create(this.form.value).subscribe(result => {
      if (result.ok) {
        sessionStorage.setItem("composer", JSON.stringify(result));
      }
    });
  }

}
