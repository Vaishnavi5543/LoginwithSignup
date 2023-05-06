import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SENDGRID_API_KEY = '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';

@Component({
  selector: 'app-password-reset',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class PasswordResetComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const headers = {
      Authorization: `Bearer ${SENDGRID_API_KEY}`
    };
    const body = {
      personalizations: [
        {
          to: [
            {
              email: this.email
            }
          ],
          subject: 'Password reset request'
        }
      ],
      from: {
        email: 'diptigund2020.etc@mmcoe.edu.in',
        name: 'PHP'
      },
      content: [
        {
          type: 'text/plain',
          value: 'Click the link to reset your password'
        }
      ]
    };

    this.http.post(url, body, { headers }).subscribe(
      () => {
        console.log('Password reset email sent successfully');
      },
      error => {
        console.error('Error sending password reset email', error);
      }
    );
  }
}
