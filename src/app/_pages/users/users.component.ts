import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxLoadingModule } from 'ngx-loading';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../_shared/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


export interface PeriodicElement {
  firstName: string;
  gender: string;
  maidenName: string;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    firstName: "Hydrogen",
    gender: "hjgfh",
    maidenName: "H",
    phone: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
]
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatNativeDateModule,
    ReactiveFormsModule, MatExpansionModule, NgxLoadingModule, MatCardModule, MatFormFieldModule, MatIconModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  user!: FormGroup
  currentlyOpenedItemIndex = -1;
  loading: boolean = false;
  usersData: any
  uservalue: any;
  constructor(private fb: FormBuilder, private userApi: UserService) {
  }

  ngOnInit(): void {
    this.userForm();
    this.getUser();
  }

  dataShow(row: any) {
    row.isExpand = !row.isExpand
    this.user.patchValue({
      firstName: row.firstName,
      maidenName: row.lastName,
      gender: row.gender,
      phone: row.phone
    })
  }

  userForm() {
    this.user = this.fb.group({
      firstName: [],
      gender: [],
      maidenName: [],
      phone: [],
    })
  }

  getUser() {
    this.userApi.get().subscribe(res => {
      this.usersData = res
      for (var user of this.usersData.users) {
        this.uservalue = user
        console.log(this.uservalue)
      }
    })
  }

  showSpinner() {
    this.loading = true;
    setTimeout(() => { this.loading = false; }, 2000);
  }
}
