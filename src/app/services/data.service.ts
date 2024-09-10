import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Adjust this URL if necessary

  constructor(private http: HttpClient) {}

  // Get token from local storage and set Authorization header
  getToken(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token.access_token);

    return this.http.get<{ access_token: string }>(`${this.apiUrl}/get-token`, { headers }).pipe(
      tap(response => {
        localStorage.setItem('token', JSON.stringify(response));
      }),
      catchError(error => {
        console.error('Error getting token:', error);
        throw error;
      })
    );
  }

  // Registration
  register(userData: { acno: number; uname: string; psw: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Error during registration:', error);
        throw error;
      })
    );
  }

  // Login
  login(credentials: { acno: number; psw: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }

  // Deposit - Simplified method with fewer arguments
  deposit(data: { acno: number; psw: string; amnt: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit`, data).pipe(
      catchError(error => {
        console.error('Error during deposit:', error);
        throw error;
      })
    );
  }

  // Withdraw
  withdraw(data: { acno: number; psw: string; amnt: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw`, data).pipe(
      catchError(error => {
        console.error('Error during withdrawal:', error);
        throw error;
      })
    );
  }

  // Fetch transactions
  getTransaction(acno: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/get-transaction/${acno}`, {}).pipe(
      catchError(error => {
        console.error('Error fetching transaction:', error);
        throw error;
      })
    );
  }

  // Delete account
  deleteAccount(acno: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-account/${acno}`).pipe(
      catchError(error => {
        console.error('Error deleting account:', error);
        throw error;
      })
    );
  }
}
