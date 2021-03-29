import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComposerService } from 'src/app/services/composer.service';

import { faKey, faGlobeEurope, faUser, faEye, faAt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  faUser = faUser;
  faKey = faKey;
  faEye = faEye;
  faGlobeEurope = faGlobeEurope;
  faAt = faAt;

  countries:String[] = ['France', 'Belgique', 'Angleterre', 'Pays des merveilles'];

  form: FormGroup = this.formBuilder.group(
    {
      lastname: [''],
      firstname: [''],
      pseudo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: [''],
      country: [''],
      email: ['', [Validators.required, Validators.email]],
      tcu: [false, Validators.required],
    },
    { validators: this.checkPasswords }
  );

  constructor(private formBuilder: FormBuilder, private api: ComposerService, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) { 
    const password = group.get('password').value;
    const repassword = group.get('repassword').value;

    return password === repassword ? null : { mismatch: true }
  }

  signup() {
    this.api.create(this.form.value).subscribe(result => {
      if (result.ok) {
<<<<<<< HEAD
        sessionStorage.setItem("composer", JSON.stringify(result.body));
=======
        sessionStorage.setItem("composer", JSON.stringify(result));
        this.router.navigateByUrl('dashboard');
        this.modal.dismissAll();
>>>>>>> dev
      }
    });
  }

}
