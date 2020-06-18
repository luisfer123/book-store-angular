import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  users: User[];
  userSelected: User;
  editUserFlag = false;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data  => {
        console.log(data);
        this.users = data;
      });

      this.activatedRoute.queryParams.subscribe(params => {
        if(params['userId']) {
          this.editUserFlag = true;
        } else {
          this.editUserFlag = false;
        }
      });
  }

  onSelectUser(userId: number) {
    this.userSelected = this.users.find(user => user.id === userId);
    this.router.navigate(['/admin/users'], { queryParams: { 'userId': userId } });
  }

}
