import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResignationService } from '../../../services/resignation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resignations',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resignations.html',
  styleUrl: './resignations.css',
})
export class Resignations {
  resignationForm: FormGroup;

  constructor(private fb: FormBuilder, private resignationService: ResignationService) {
    this.resignationForm = this.fb.group({
      requestedById: [1],
      reason: ['', Validators.required],
      proposedLastWorkingDay: ['', Validators.required],
      attachment: [''],
      firstApproveId: [null, Validators.required],
      secondApproveId: [''], // optional
    });
  }

  submitForm() {
    const payload = {
      ...this.resignationForm.value,
    };

    this.resignationService.createResignationRequest(payload).subscribe(() => {});
  }
}
