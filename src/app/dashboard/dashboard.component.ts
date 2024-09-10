import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  acno!: string; // Using definite assignment assertion
  user: any;
  sDetails!: Date;

  constructor(
    private ds: DataService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.sDetails = new Date();
    
    if (!localStorage.getItem("currentAcno")) {
      this.toastr.warning("Please login");
      this.router.navigateByUrl("/");
    }
  }

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt: ['', [Validators.required, Validators.min(100), Validators.max(50000)]]
  });

  withdrawForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt: ['', [Validators.required, Validators.min(100), Validators.max(50000)]]
  });

  deposit() {
    const { acno, psw, amnt } = this.depositForm.value as { acno: string; psw: string; amnt: string };
    if (this.depositForm.valid) {
      const depositData = {
        acno: parseInt(acno), // convert acno to number
        psw: psw,
        amnt: parseFloat(amnt) // convert amnt to number
      };

      this.ds.deposit(depositData).subscribe(
        (result: any) => {
          this.toastr.success(result.message);
          this.depositForm.reset();
        },
        (error: any) => {
          this.toastr.error(error.error ? error.error.message : 'An error occurred');
        }
      );
    } else {
      this.toastr.warning('Invalid form');
    }
  }

  withdrew() {
    const { acno, psw, amnt } = this.withdrawForm.value as { acno: string; psw: string; amnt: string };
    if (this.withdrawForm.valid) {
      const withdrawData = {
        acno: parseInt(acno), // convert acno to number
        psw: psw,
        amnt: parseFloat(amnt) // convert amnt to number
      };

      this.ds.withdraw(withdrawData).subscribe(
        (result: any) => {
          this.toastr.success(result.message);
          this.withdrawForm.reset();
        },
        (error: any) => {
          this.toastr.error(error.error ? error.error.message : 'An error occurred');
        }
      );
    } else {
      this.toastr.warning('Invalid form');
    }
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentAcno");
    this.router.navigateByUrl("/");
  }

  deleteAcc() {
    this.acno = localStorage.getItem("currentAcno") || "";
  }

  cancelChild() {
    this.acno = "";
  }

  ondeleteAcc(event: string) {
    if (event && this.acno) {
      this.ds.deleteAccount(parseInt(this.acno)).subscribe(
        (result: any) => {
          this.toastr.success(result.message);
          this.logout();
        },
        (error: any) => {
          this.toastr.error(error.error ? error.error.message : 'An error occurred');
        }
      );
    }
  }
}
