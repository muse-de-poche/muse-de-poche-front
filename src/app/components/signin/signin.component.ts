import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  show: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ComposerService, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
  }

  login() {
    this.api.login(this.form.value).subscribe(result => {
      if (result.ok) {
        sessionStorage.setItem("composer", JSON.stringify(result.body));
        this.router.navigateByUrl('dashboard');
        this.modal.dismissAll();
      }
    }, error => {
      if(error.status === 404) {
        console.log("erreur de crédentials");
        this.show = true;
      }
    });
  }

}
