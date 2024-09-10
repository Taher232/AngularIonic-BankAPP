import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Changed to SCSS for consistency with Ionic
})
export class RegisterComponent {

  acno: any;
  uname: any;
  psw: any;

  d1 = "Enter account number";
  d2 = "Enter password";

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  // Model for register form 
  registerForm1 = this.fb.group({
    acno: [' ', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: [' ', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]]
  });

  register() {
    const acno = this.registerForm1.value.acno;
    const psw = this.registerForm1.value.psw;
    const uname = this.registerForm1.value.uname;
    if (this.registerForm1.valid) {
      this.ds.register(acno, uname, psw).subscribe((result: any) => {
        alert(result.message);
        this.router.navigateByUrl("");
      },
      result => {
        alert(result.error.message);
      });
    } else {
      alert("Invalid form");
    }
  }
}
