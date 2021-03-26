import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComposerService } from 'src/app/services/composer.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  form: FormGroup = this.formBuilder.group(
    {
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }
  );

  constructor(private formBuilder: FormBuilder, private api: ComposerService) { }

  ngOnInit(): void {
  }

  login() {
    this.api.login(this.form.value).subscribe(result => {
      if (result.ok) {
        sessionStorage.setItem("composer", JSON.stringify(result));
      }
    });
  }

}
