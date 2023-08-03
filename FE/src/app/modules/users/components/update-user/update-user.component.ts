import { selectUserById } from '../../state/users.selectors';
import { userActions } from '../../state/users.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

// password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });
    this.user$ = new Observable<User>(); // Initialize the user$ property as an empty Observable
  }

  userForm: FormGroup;
  success_message: string = '';
  failure_message: string = '';

  user$: Observable<User | undefined>; // Declare an Observable to hold the user details

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.user$ = this.store.select(selectUserById(userId));
      this.user$.subscribe((user) => {
        if (user) {
          this.initializeForm(user); // Initialize the form with the user details
        }
      });
    }
  }

  initializeForm(user: User) {
    this.userForm = this.fb.group({
      name: [user.name, Validators.required], // Bind the 'name' property to the form field
      username: [user.username, Validators.required], // Bind the 'username' property to the form field
      email: [user.email, [Validators.required, Validators.email]], // Bind the 'email' property to the form field
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });
  }

  // ngOnInit() {
  //   // Get the user ID from the URL parameters
  //   const userId = this.route.snapshot.paramMap.get('id');
  //   if (userId) {
  //     // Fetch the user details from the store based on the user ID
  //     this.store.select(selectUserById(userId)).subscribe((user) => {
  //       if (user) {
  //         // Set the form values with the retrieved user details
  //         this.userForm.patchValue(user);
  //       }
  //     });
  //   }
  // }

  updateUser(user: User) {
    console.log(user._id);
    if (this.userForm.invalid) return;
    this.store.dispatch(
      userActions.updateUser({ _id: user._id, user: this.userForm.value })
    );
  }
}
