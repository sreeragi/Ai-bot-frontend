import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, UserStyle } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  userMessage = '';
  messages: { text: string; isUser: boolean; time: string }[] = [];
  isTyping = false;

  styleConfig?: UserStyle;
  userId: number = 1;
  logoUrl: string = ''; // ✅ Holds the logo URL or Base64 string

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

ngOnInit(): void {
  const id = Number(this.route.snapshot.queryParamMap.get('id')) || 1;
  this.userId = id;

  this.apiService.getStyleById(this.userId).subscribe({
    next: (style) => {
      this.styleConfig = style;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.messages.push({
        text: `Hi ${style.userName}! How can I help you today?`,
        isUser: false,
        time
      });
    },
    error:(err)=>console.error("Style fetch error:",err)
  });

  // ✅ Fetch Logo separately
  this.apiService.getLogo(this.userId).subscribe({
    next: (res) => {
      this.styleConfig = { ...this.styleConfig, logo: res.logo };
    },
    error: (err) => console.error('Logo fetch error:', err)
  });
}

  sendMessage(): void {
    const text = this.userMessage.trim();
    if (!text) return;

    const time = this.getCurrentTime();
    this.messages.push({ text, isUser: true, time });
    this.scrollToBottom();
    this.userMessage = '';
    this.isTyping = true;

    this.apiService.sendMessage(text, this.userId).subscribe({
      next: (res) => {
        const botTime = this.getCurrentTime();
        this.messages.push({ text: res.reply, isUser: false, time: botTime });
        this.isTyping = false;
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isTyping = false;
      }
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatBody?.nativeElement) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    }, 100);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  ngOnDestroy(): void {}
}
