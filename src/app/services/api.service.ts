import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly SERVER_URL = 'https://ai-bot-backend-in6g.onrender.com/api'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  // Send message to backend and get response
  sendMessage(message: string, userId: string | number): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(`${this.SERVER_URL}/chat`, {
      message,
      userId
    });
  }
}
