export class EmployeeInfo {
  constructor(public id: string,
              public name: string,
              public dep: string) {
  }
}

export class UserInfo {
  constructor(public id: string,
              public name: string,
              public dep: string,
              public tel: string,
              public email: string,
              public password: string,
              public photo: string) {
  }
}

export class AboutMe {
  constructor(public id: string,
              public edu: string,
              public loc: string,
              public skill: string,
              public motto: string) {
  }
}

export class UserToDoList {
  constructor(public id: number,
              public userId: string,
              public date: string,
              public time: string,
              public thing: string,
              public isDone: boolean) {
  }
}

export class FormList {
  constructor(public id: string,
              public userId: string,
              public type: string,
              public state: [number, string],
              public time: string,
              public reason: string) {
  }
}
