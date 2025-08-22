import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service'; // ✅ Import service

import { USER_STYLES, UserStyle } from '../shared/styles.config.ts';
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
  
  styleConfig!: UserStyle
   userId: 'user1' | 'user2' | 'user3' = 'user1';

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  // Get userId from query params (or default to 'user1')
  const userId = this.route.snapshot.queryParamMap.get('userId') as 'user1' | 'user2' | 'user3' || 'user1';

  // Set the styleConfig based on userId
  this.styleConfig = USER_STYLES[userId];

  // Push greeting message after styleConfig is set
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  this.messages.push({
    text: this.styleConfig.greeting || 'Hi! How can I help you today?',
    isUser: false,
    time
  });
}


  sendMessage(): void {
    const text = this.userMessage.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Push user message
    this.messages.push({ text, isUser: true, time });
    this.scrollToBottom();
    this.userMessage = '';
    this.isTyping = true;

    // ✅ Call backend API
    this.apiService.sendMessage(text, 'user123').subscribe({
      next: (res) => {
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  ngOnDestroy(): void {}
}
