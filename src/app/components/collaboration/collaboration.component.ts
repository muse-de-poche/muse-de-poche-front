import { CollaborationService } from 'src/app/services/collaboration.service';
import { Collaboration } from './../../models/collaboration';
import { Composer } from 'src/app/models/composer';
import { Composition } from 'src/app/models/composition';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ComposerService } from 'src/app/services/composer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.sass']
})
export class CollaborationComponent implements OnInit {

  @Input() composition: Composition;
  @Input() composer: Composer;

  form: FormGroup = this.formBuilder.group(
    {
      text: ['', [Validators.required]],
    }
  );

  constructor(private formBuilder: FormBuilder, private collabService: CollaborationService, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
  }

  collaborer() {
    
    let collaboration: Collaboration = {
      id: null,
      demandDate: new Date(),
      validatedDate: null,
      lastUpdate: new Date(),
      composition: this.composition,
      composer: this.composer,
      status: "WAITING",
      right: "READONLY",
      text: this.form.get("text").value
    }
    
    this.collabService.create(collaboration).subscribe(result => {
      if (result.ok) {
        this.router.navigateByUrl('');
        this.modal.dismissAll();
      }
    });
  }

}
