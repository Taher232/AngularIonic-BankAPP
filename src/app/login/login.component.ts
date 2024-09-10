import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Changed to SCSS for consistency with Ionic
})
export class LoginComponent {

  data1 = "Enter your account number";
  data2 = "Enter your password";

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  });

  login() {
    const acno = this.loginForm.value.acno;
    const psw = this.loginForm.value.psw;
    if (this.loginForm.valid) {
      this.ds.login(acno, psw).subscribe((result: any) => {
        localStorage.setItem("currentUser", result.currentUser);
        localStorage.setItem("currentAcno", JSON.stringify(result.currentAcno));
        localStorage.setItem("token", JSON.stringify(result.token));

        alert(result.message);
        this.router.navigateByUrl("dashboard");
      },
      result => {
        alert(result.error.message);
      });
    } else {
      alert('Invalid form');
    }
  }
}
