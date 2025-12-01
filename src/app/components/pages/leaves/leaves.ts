import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../../../services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaves',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class Leaves {
  attachmentBase64: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: RequestsService, private router: Router) {
    this.form = this.fb.group({
      requestedById: [1], // will get from auth later
      startDate: ['', Validators.required],
      numberOfDays: ['', Validators.required],
      leaveType: ['', Validators.required],
      reason: ['', Validators.required],
      attachment: [''],
      isPaid: [false],
      firstApproveId: ['', Validators.required],
      secondApproveId: [''],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.attachmentBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    const formValue = this.form.value;
    const payload = {
      ...this.form.value,
      leaveType: Number(formValue.leaveType),
    };

    this.service.addLeaveRequest(payload).subscribe(() => {
      this.router.navigate(['/requests/leave']);
    });
  }
}
