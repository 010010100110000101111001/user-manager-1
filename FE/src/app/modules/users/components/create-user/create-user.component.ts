import { userActions } from '../../state/users.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

// password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  constructor(private fb: FormBuilder, private store: Store) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });
  }

  userForm: FormGroup;
  success_message: string = '';
  failure_message: string = '';

  createUser() {
    if (this.userForm.invalid) return;
    this.store.dispatch(userActions.createUser({ user: this.userForm.value }));
    this.userForm.reset();
  }
}

// import { Component } from '@angular/core';
// import { UsersService } from '../../services/users.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// // password validation regex
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// @Component({
//   selector: 'app-create-user',
//   templateUrl: './create-user.component.html',
// })
// export class CreateUserComponent {
//   userForm: FormGroup<any>;

//   constructor(private fb: FormBuilder, private usersService: UsersService) {
//     this.userForm = this.fb.group({
//       name: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
//     });
//   }

//   success_message: string = '';
//   failure_message: string = '';

//   createUser() {
//     if (this.userForm.invalid) {
//       // If the form is invalid, show validation messages and prevent form submission
//       this.markFormGroupTouched(this.userForm);
//       return;
//     }

//     // Get form values
//     const { name, username, email, password } = this.userForm.value;

// this.usersService.createUser(this.userForm.value).subscribe(
//   (user) => {
//     this.success_message = 'User created successfully';
//   },
//   (error) => {
//     if (error.status === 400) {
//       if (error.error.message === 'Username already exists') {
//         this.failure_message =
//           'Username already exists. Please choose a different username.';
//       } else if (error.error.message === 'Email already exists') {
//         this.failure_message =
//           'Email already exists. Please choose a different email.';
//       }
//     } else if (error.error.status === 500) {
//       this.failure_message = 'Error creating user. Please try again.';
//     }
//   }
// );

//     this.userForm.reset();
//   }

//   // Helper function to mark all form controls as touched
//   private markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach((control) => {
//       control.markAsTouched();
//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
// }
