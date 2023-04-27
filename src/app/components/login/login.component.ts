import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _Toaster: ToastrService
  ) {}

  hide = true;

  loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  login(formData: FormGroup): void {
    if (formData.valid) {
      this._AuthService.login(formData.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            localStorage.setItem('_tokenNote', response.token);
            this._AuthService.userData();
            this._Router.navigate(['/home']);
          } else {
            console.log(response);

            this._Toaster.warning(response.message, '', {
              timeOut: 5000,
            });
          }
        },
      });
    }
  }
}
