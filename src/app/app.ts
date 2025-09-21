import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from '../services/employee/employee-service';
import { FormsModule } from '@angular/forms';
import { IEmployee } from '../interfaces/iemployee';
import { IEmployeeApiReturn } from '../interfaces/iemployee-api-return';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  private employeeService = inject(EmployeeService);
  // constructor(private employeeService: EmployeeService) {}

  protected employees = signal<IEmployee[]>([]);

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employeeReturn: IEmployeeApiReturn) => {
        // Check if data exists and is an array before setting the signal
        if (employeeReturn.data && Array.isArray(employeeReturn.data)) {
          this.employees.set(employeeReturn.data);
        } else {
          // Handle cases where data is null or a single IEmployee, if necessary.
          // For example, you could set the signal to an empty array.
          this.employees.set([]);
        }
      },
    });
  }

  handleCreateNewBtnClick() {
    let blankEmployee: IEmployee = {
      name: '',
      age: null,
      isGraduate: false,
      isInEditMode: true,
    };

    let newArray = [blankEmployee, ...this.employees()];

    this.employees.set(newArray);
  }

  handleSaveBtnClick(employee: IEmployee) {
    employee.isInEditMode = false;
    if (employee._id) {
      // Give a PUT call.
      this.updateEmployee(employee);
    } else {
      // Give a POST call.
      this.addEmployee(employee);
    }
  }

  addEmployee(employee: IEmployee) {
    delete employee.isInEditMode;

    this.employeeService.addEmployee(employee).subscribe({
      next: () => {
        this.getAllEmployees();
      },
    });
  }

  updateEmployee(employee: IEmployee) {
    delete employee.isInEditMode;

    this.employeeService.updateEmployeeById(employee._id as String, employee).subscribe({
      next: () => {
        this.getAllEmployees();
      },
    });
  }

  removeEmployee(employee: IEmployee) {
    this.employeeService.removeEmployeeById(employee._id as String).subscribe({
      next: () => {
        this.getAllEmployees();
      },
    });
  }
}
