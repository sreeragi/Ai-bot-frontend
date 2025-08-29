import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserStyle {
   id?: number;
  userId?: number;
  userName?: string; // ✅ Add this line
  headerColor?: string;
  botMsgBg?: string;
  userMsgBg?: string;
  buttonColor?: string;
  botTextColor?: string;
  userTextColor?: string;
  fontFamily?: string;
  fontSize?: number;
  theme?: string;
  logo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly SERVER_URL = 'http://localhost:3000/api'; // your deployed backend

  constructor(private http: HttpClient) {}

  // Chat message
  sendMessage(message: string, userId: string | number): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(`${this.SERVER_URL}/chat`, { message, userId });
  }

  // ✅ Fetch style by userId
  getStyleById(id: number): Observable<UserStyle> {
    return this.http.get<UserStyle>(`${this.SERVER_URL}/styles/${id}`);
  }

  getLogo(userId: number): Observable<{ logo: string }> {
  return this.http.get<{ logo: string }>(`${this.SERVER_URL}/logo/${userId}`);
}

}
