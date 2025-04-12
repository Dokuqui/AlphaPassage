import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isDarkTheme: boolean = false;
  loginError: string | null = null;
  loading: boolean = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.isBrowser) {
      this.isDarkTheme = this.document.body.classList.contains('dark-theme');
      const observer = new MutationObserver(() => {
        this.isDarkTheme = this.document.body.classList.contains('dark-theme');
      });
      observer.observe(this.document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });

      const token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/']);
      }
    }
  }

  onSubmit() {
    this.loading = true;
    this.loginError = null;

    setTimeout(() => {
      this.loading = false;

      if (this.email !== 'demo@demo.com' || this.password !== '1234') {
        this.loginError = 'Invalid credentials. Please try again.';
      } else {
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('role', 'admin');

        this.router.navigate(['/dashboard']);
      }
    }, 1000);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
