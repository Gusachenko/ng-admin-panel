import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserObject } from 'app/classes/global-interfaces';

@Injectable()
export class GlobalStateService {

    private usersDataModelSource = new Subject<UserObject[]>();
    private usersDataItemSource = new Subject<UserObject>();


    public usersDataModelState = this.usersDataModelSource.asObservable();
    public usersDataItemState = this.usersDataItemSource.asObservable();

    public changeUsersDataItemState(userObject: UserObject) {
      this.usersDataItemSource.next(userObject);
    }

    public changeUsersDataModelState(userObjects: UserObject[]) {
      this.usersDataModelSource.next(userObjects);
    }

    constructor() { }

}