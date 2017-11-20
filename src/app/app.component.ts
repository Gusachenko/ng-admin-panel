import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { POSITION_LSIT, DEPARTMENT_LIST, EnumToObjectArray } from './classes/global-variables.enum';
import { UserObject } from './classes/global-interfaces';
import { ApiDbService } from './services/api-db.service';
import { GlobalStateService } from 'app/services/global-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiDbService, GlobalStateService]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('userDialog') userDialog;

  enable = false;

  sourceUsersModel: UserObject[];
  departments: Department[];

  positionList: any;
  departmentList: any;

  filterNameValue = '';
  filterPositionValue = '';
  filterDepartmentValue = '';

  public apiResponseData: any;

  constructor(private apiDbService: ApiDbService, private globalStateService: GlobalStateService) {
    this.apiDbService.getAllData().subscribe(data => {

      if (!!data.elementData) {
        this.globalStateService.changeUsersDataModelState(data.elementData);
        this.enable = true;
      } else {
        console.log('Check MongoDB document!');
      }
    });

    this.departmentList = EnumToObjectArray(DEPARTMENT_LIST);
    this.positionList = EnumToObjectArray(POSITION_LSIT);

    this.globalStateService.usersDataModelState.subscribe(dataModelState => {
      this.sourceUsersModel = dataModelState;
      this.departments = this.extractSeparateDepartments(dataModelState);
      this.apiDbService.updateAllData(this.sourceUsersModel).subscribe(data => {});
      this.filtersExecute();
    });

  }

  ngAfterViewInit() {
    this.globalStateService.usersDataItemState.subscribe(dataItemState => {
      if (!!dataItemState.id) {
        this.sourceUsersModel[this.searchUserInArrayById(dataItemState.id)] = dataItemState;
        this.globalStateService.changeUsersDataModelState(this.sourceUsersModel);
      } else {
        let lastId;
        if (this.sourceUsersModel.length === 0) {
          lastId = 0;
        } else {
          lastId = parseInt(this.sourceUsersModel[this.sourceUsersModel.length - 1].id) + 1;
        }
        dataItemState.id = '' + lastId;
        this.sourceUsersModel.push(dataItemState);
        this.globalStateService.changeUsersDataModelState(this.sourceUsersModel);
      }

      this.apiDbService.updateAllData(this.sourceUsersModel).subscribe(data => {});
      this.filtersExecute();
    });
  }

  applyNameFilter(): void {
    this.filtersExecute();
  }

  clearNameFilter(): void {
    this.filterNameValue = '';
    this.filtersExecute();
  }

  applyPositionFilter(): void {
    this.filtersExecute();
  }

  applyDepartmentFilter(): void {
    this.filtersExecute();
  }

  addDepartmentUser(departmentName: string) {
    this.userDialog.addDepartmentUser(departmentName);
  }

  settingsDepartmentUser(userObject: any) {
    this.userDialog.settingsDepartmentUser(userObject);
  }

  photoDepartmentUser() {
    this.userDialog.openPhoto();
  }

  removeDepartmentUser(userObject: any) {
    this.sourceUsersModel.splice(this.searchUserInArrayById(userObject.id), 1);
    this.globalStateService.changeUsersDataModelState(this.sourceUsersModel);
  }

  private filtersExecute(): void {
    let resultModelData,
      bufferData;
    resultModelData = this.sourceUsersModel;

    if (this.filterNameValue !== '' && !!this.filterNameValue) {
      bufferData = resultModelData.filter(userObject => {
        let bufObject = Object.assign({}, userObject);
        bufObject.lastName = userObject.lastName.trim();
        bufObject.lastName = userObject.lastName.toLocaleLowerCase();
        return bufObject.lastName.indexOf(this.filterNameValue.trim().toLowerCase()) > -1;
      });
      resultModelData = bufferData;
    }

    if (this.filterPositionValue !== '' && !!this.filterPositionValue) {
      bufferData = resultModelData.filter(userObject => {
        let bufObject = Object.assign({}, userObject);
        bufObject.position = userObject.position.trim();
        bufObject.position = userObject.position.toLocaleLowerCase();
        return bufObject.position.indexOf(this.filterPositionValue.trim().toLowerCase()) > -1;
      });
      resultModelData = bufferData;
    }

    if (this.filterDepartmentValue !== '' && !!this.filterDepartmentValue) {
      bufferData = resultModelData.filter(userObject => {
        let bufObject = Object.assign({}, userObject);
        bufObject.department = userObject.department.trim();
        bufObject.department = userObject.department.toLocaleLowerCase();
        return bufObject.department.indexOf(this.filterDepartmentValue.trim().toLowerCase()) > -1;
      });
      resultModelData = bufferData;
    }

    if (!!resultModelData) {
      this.departments = this.extractSeparateDepartments(resultModelData);
    } else {
      this.departments = this.extractSeparateDepartments(this.sourceUsersModel);
    }
  }

  private searchUserInArrayById(id: string): number {
    let userPositionInArray;

    for (let index = 0; index < this.sourceUsersModel.length; index++) {
      let user = this.sourceUsersModel[index];
      if (user.id === id) {
        userPositionInArray = index;
        break;
      }
    }

    return userPositionInArray;
  }

  private extractSeparateDepartments(departmentData: UserObject[]): Department[] {
    let separateDepartmentsData = {};
    let departmentsArr: Department[] = [];
    for (let key in DEPARTMENT_LIST) {
      if (DEPARTMENT_LIST.hasOwnProperty(key)) {
        let departmentListTitle = DEPARTMENT_LIST[key];
        separateDepartmentsData[departmentListTitle] = [];
      }
    }

    departmentData.forEach(element => {
      switch (element.department) {
        case DEPARTMENT_LIST.personnelMenegment:
          separateDepartmentsData[element.department].push(element);
          break;
        case DEPARTMENT_LIST.menegmentOfRisks:
          separateDepartmentsData[element.department].push(element);
          break;
        default:
          console.error(`'${element.department}' : Department not found!`);
          break;
      }
    });
    for (let key in separateDepartmentsData) {
      if (separateDepartmentsData.hasOwnProperty(key)) {
        let departmentData = separateDepartmentsData[key];
        if (departmentData.length !== 0)
          departmentsArr.push(new Department(key, departmentData));
      }
    }

    return departmentsArr;
  }

}


class Department {
  private _name: string;
  private _elements: UserObject[];

  public tableDataSource: any;
  public displayedColumns = ['lastName', 'position', 'actions'];

  get name() {
    return this._name;
  }
  set name(newName: string) {
    this._name = name;
  }

  get elements() {
    return this._elements;
  }
  set elements(newElements: UserObject[]) {
    this._elements = newElements;
  }


  constructor(name, elements) {
    this._name = name;
    this._elements = elements;

    this.tableDataSource = new MatTableDataSource(this.elements);
  };

}

// const ELEMENT_DATA: UserObject[] = [
//   {
//     "id": "0",
//     "firstName": "Илья1",
//     "lastName": "Иванов",
//     "otchestvoName": "Дмириевич",
//     "sex": "male",
//     "photo": "",
//     "position": "Начальник",
//     "department": "Департамент управления персоналом",
//     "accesses": {
//       "openDeposit": false,
//       "closeDeposit": true,
//       "approveCredit": false,
//       "approveAccountOpen": true
//     }
//   },
//   {
//     "id": "1",
//     "firstName": "Илья2",
//     "lastName": "Бериков",
//     "otchestvoName": "Дмириевич",
//     "sex": "male",
//     "photo": "",
//     "position": "Секретарь",
//     "department": "Департамент управления персоналом",
//     "accesses": {
//       "openDeposit": false,
//       "closeDeposit": true,
//       "approveCredit": false,
//       "approveAccountOpen": true
//     }
//   },
//   {
//     "id": "2",
//     "firstName": "Илья3",
//     "lastName": "Кузнецов",
//     "otchestvoName": "Дмириевич",
//     "sex": "male",
//     "photo": "",
//     "position": "Администратор",
//     "department": "Департамент управления рисками",
//     "accesses": {
//       "openDeposit": false,
//       "closeDeposit": true,
//       "approveCredit": false,
//       "approveAccountOpen": true
//     }
//   },
//   {
//     "id": "3",
//     "firstName": "Илья4",
//     "lastName": "Ахметов",
//     "otchestvoName": "Дмириевич",
//     "sex": "male",
//     "photo": "",
//     "position": "Директор",
//     "department": "Департамент управления рисками",
//     "accesses": {
//       "openDeposit": false,
//       "closeDeposit": true,
//       "approveCredit": false,
//       "approveAccountOpen": true
//     }
//   },
//   {
//     "id": "4",
//     "firstName": "Наталья",
//     "lastName": "Иванова",
//     "otchestvoName": "Алексеевна",
//     "sex": "female",
//     "photo": "",
//     "position": "Секретарь",
//     "department": "Департамент управления рисками",
//     "accesses": {
//       "openDeposit": false,
//       "closeDeposit": true,
//       "approveCredit": false,
//       "approveAccountOpen": true
//     }
//   }
// ];