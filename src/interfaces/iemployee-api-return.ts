import { IEmployee } from "./iemployee";

export interface IEmployeeApiReturn {
  message: string;
  data: IEmployee | IEmployee[];
}
