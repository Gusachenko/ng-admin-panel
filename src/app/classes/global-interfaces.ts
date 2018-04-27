export class UserObject {
  id: string;
  firstName: string;
  lastName: string;
  otchestvoName: string;
  sex: string;
  photo: any;
  position: string;
  department: string;
  accesses: {
    openDeposit: boolean;
    closeDeposit: boolean;
    approveCredit: boolean;
    approveAccountOpen: boolean;
  };

  constructor(
    id: string = undefined,
    firstName: string = '',
    lastName: string = '',
    otchestvoName: string = '',
    sex: string = '',
    photo: any = undefined,
    position: string = '',
    department: string = '',
    accesses: any = {
      openDeposit: false,
      closeDeposit: false,
      approveCredit: false,
      approveAccountOpen: false
    }
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.otchestvoName = otchestvoName;
    this.sex = sex;
    this.photo = photo;
    this.position = position;
    this.department = department;
    this.accesses = accesses;
  }
}
