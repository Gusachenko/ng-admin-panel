import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { UserPhotoComponent } from './user-photo/user-photo.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { GlobalStateService } from 'app/services/global-state.service';

import { UserObject } from 'app/classes/global-interfaces';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, private globalStateService: GlobalStateService) { }

  openPhoto() {
    const dialogRef = this.dialog.open(UserPhotoComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addDepartmentUser(departmentName: string) {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '480px',
      data: {
        'departmentName': departmentName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result)
        this.globalStateService.changeUsersDataItemState(result);
    });
  }

  settingsDepartmentUser(userObject: UserObject) {
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      width: '480px',
      data: {
        'userObject': userObject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result)
        this.globalStateService.changeUsersDataItemState(result);
    });
  }

  ngOnInit() {
  }

}

