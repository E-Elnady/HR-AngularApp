import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RequestsService } from '../../../services/requests.service';
import { LeaveRequest } from '../../../interfaces/leaveRequest.interface';
import { CommonModule } from '@angular/common';
import { ResignationRequest } from '../../../interfaces/resignationRequest.interface';
import { Employee, Person, UserTemp } from '../../../services/userTemp.service';

@Component({
  selector: 'app-requests',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests implements OnInit {
  allRequests: RequestTableItem[] = [];
  leaves: LeaveRequest[] = [];
  resignations: ResignationRequest[] = [];
  employee: Employee | null = null;
  person: Person | null = null;
  constructor(private requestsService: RequestsService, private userService: UserTemp) {}

  ngOnInit(): void {
    const StatusMap: { [key: string]: string } = {
      '0': 'Pending',
      '1': 'Approved',
      '2': 'Rejected',
      '3': 'In Progress',
    };
    this.userService.getUserData().subscribe((data) => {
      this.employee = data.employee;
      this.person = data.person;

      console.log(this.employee);
      this.loadRequests(StatusMap);
      console.log(this.allRequests);
    });
  }

  addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().substring(0, 10);
  }

  loadRequests(StatusMap: any) {
    this.requestsService.GetRequestsByEmployeeID(6).subscribe({
      next: (req) => {
        console.log('API Response:', req);
        this.allRequests = req.result.map((r) => ({
          id: r.id,
          type: r.type,
          date: r.date,
          status: StatusMap[r.status],
          name: r.name,
        }));
      },
      error: (err) => console.error('Leave request error', err),
    });
  }

  //   // Leave requests
  //   this.requestsService.getAllLeaveRequests().subscribe({
  //     next: (leave) => {
  //       const leaveRequests: RequestTableItem[] = leave.result.map((l) => ({
  //         id: l.id,
  //         employee: this.person?.fullName || '',
  //         type: 'Leave',
  //         submittedOnDate: l.createdOn,
  //         status: StatusMap[l.status],
  //       }));
  //       this.allRequests.push(...leaveRequests);
  //     },
  //     error: (err) => console.error('Leave request error', err),
  //   });

  //   // Resignation requests
  //   this.requestsService.getAllResignationRequest().subscribe({
  //     next: (res) => {
  //       const resignationRequests: RequestTableItem[] = res.result.map((r) => ({
  //         id: r.id,
  //         employee: this.person?.fullName || '',
  //         type: 'Resignation',
  //         submittedOnDate: r.createdOn,
  //         status: StatusMap[r.status],
  //       }));
  //       this.allRequests.push(...resignationRequests);
  //     },
  //     error: (err) => console.error('Resignation request error', err),
  //   });

  //   // HR letter requests
  //   this.requestsService.getAllHRLetterRequests().subscribe({
  //     next: (res) => {
  //       const hrLetterRequests: RequestTableItem[] = res.result.map((h) => ({
  //         id: h.id,
  //         employee: this.person?.fullName || '',
  //         type: 'HR Letter',
  //         submittedOnDate: h.createdOn,
  //         status: StatusMap[h.status],
  //       }));
  //       this.allRequests.push(...hrLetterRequests);
  //     },
  //     error: (err) => console.error('HR letter request error', err),
  //   });
  // }
}
