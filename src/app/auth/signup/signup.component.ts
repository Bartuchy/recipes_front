import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request-payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload!: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {

    this.signupRequestPayload = {
      email: '',
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern("[a-zA-z]{3,20}[0-9]*")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]{4,25}[0-9]+")])
    })
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload)
    .subscribe(() => {
      this.router.navigate(['/login'], 
      { queryParams: { registered: 'true' } });
    }, () => {
      this.toastr.error('User with this data already exists! Try another email or username');
    });
  }

  getUsername() {
    return this.signupForm.get('username');
  }
}
