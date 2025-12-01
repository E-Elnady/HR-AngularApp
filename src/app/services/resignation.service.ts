import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResignationService {
  private baseUrl = 'http://localhost:5220/api/ResignationRequest';

  constructor(private http: HttpClient) {}

  createResignationRequest(body: any) {
    debugger;
    return this.http.post(`${this.baseUrl}/ResignationRequests`, body);
  }
}
