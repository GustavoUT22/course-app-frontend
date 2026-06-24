import { Component, inject, OnInit, signal } from '@angular/core';
import { UserModel } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-teachers',
  imports: [DatePipe],
  templateUrl: './admin-teachers.html',
  styleUrl: './admin-teachers.css',
})
export class AdminTeachers implements OnInit {
  users = signal<UserModel[]>([]);

  private userService = inject(UserService);

  get allActives() {
    return this.users().filter((user) => user.status === 'active').length;
  }
  get allPending() {
    return this.users().filter((user) => user.status === 'pending').length;
  }
  get allSuspended() {
    return this.users().filter((user) => user.status === 'suspended').length;
  }

  get allLenghtUsers() {
    return this.users().length;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        const teachers = data.filter((user) => user.role === 'teacher');

        this.users.set(teachers);
        console.log(data);
      },
      error: (error) => {
        console.log(`Error to get teachers`, error);
      },
    });
  }
}
