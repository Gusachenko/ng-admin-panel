import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { POSITION_LSIT, ACCESSES_LIST, EnumToObjectArray } from 'app/classes/global-variables.enum'
import { UserDialogComponent } from 'app/components/user-dialog/user-dialog.component';
import { UserObject } from 'app/classes/global-interfaces';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  positionList: any;
  accessesList: any;
  userObject: UserObject;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.positionList = EnumToObjectArray(POSITION_LSIT);
    this.accessesList = EnumToObjectArray(ACCESSES_LIST);

    this.userObject = new UserObject();
    this.userObject.department = data.departmentName;

  }

  ngOnInit() {
  }

  onSaveClick(): void {
    this.dialogRef.close(this.userObject);
  }

}
