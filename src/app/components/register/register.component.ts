import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _Router: Router,
    private _Toaster: ToastrService
  ) {}
  hide = true;

  registerForm: FormGroup = this._fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    age: ['', [Validators.required]],
  });

  register(formData: FormGroup): void {
    if (formData.valid) {
      this._auth.register(formData.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
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
