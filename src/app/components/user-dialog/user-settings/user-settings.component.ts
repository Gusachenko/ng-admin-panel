import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {
  POSITION_LSIT,
  ACCESSES_LIST,
  DEPARTMENT_LIST,
  EnumToObjectArray
} from 'app/classes/global-variables.enum';
import { UserDialogComponent } from 'app/components/user-dialog/user-dialog.component';
import { UserObject } from 'app/classes/global-interfaces';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  positionList: any;
  accessesList: any;
  departmentList: any;
  userObject: UserObject;
  currentDepartmentKeyValue: string;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.positionList = EnumToObjectArray(POSITION_LSIT);
    this.accessesList = EnumToObjectArray(ACCESSES_LIST);
    this.departmentList = EnumToObjectArray(DEPARTMENT_LIST);

    this.userObject = Object.assign({}, data.userObject);
  }

  ngOnInit() {}

  private getKeyValueFromList(list: any, currentValue: string): string {
    let bufKey;
    list.forEach(element => {
      if (currentValue === element.value) {
        bufKey = element.key;
      }
    });
    return bufKey;
  }

  onSaveClick(): void {
    this.dialogRef.close(this.userObject);
  }
}
