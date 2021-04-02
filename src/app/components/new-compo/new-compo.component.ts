import { Composition } from './../../models/composition';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CompositionService } from 'src/app/services/composition.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Composer } from './../../models/composer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-compo',
  templateUrl: './new-compo.component.html',
  styleUrls: ['./new-compo.component.sass']
})
export class NewCompoComponent implements OnInit {

  @Input() composer: Composer;

  form: FormGroup = this.formBuilder.group(
    {
      title: ['', [Validators.required,Validators.min(3)]],
    }
  );

  constructor(private formBuilder: FormBuilder, private CompositionService: CompositionService, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
  }

  createCompo() {
    
    let composition: Composition = {
      id: null,
      title: this.form.get("title").value,
      owner: this.composer
    }
    
    this.CompositionService.create(composition).subscribe(result => {
      if (result.ok) {
        this.modal.dismissAll();
        this.router.navigateByUrl('editor/'+result.body.id);
      }
    });
  }

}
