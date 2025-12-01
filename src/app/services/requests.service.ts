import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private baseUrl = 'http://localhost:5220/api/LeaveRequest/LeaveRequests';

  constructor(private http: HttpClient) {}

  addLeaveRequest(dto: any) {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  getLeaveRequests() {
    return this.http.get(`${this.baseUrl}`);
  }
}
