import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Application } from '../../models/application';

@Component({
  selector: 'app-applications',
  imports: [FormsModule, RouterLink],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications {

  applications: Application[] = [];

  filteredApplications: Application[] = [];

  searchTerm = '';

  selectedStatus = '';

  selectedJobType = '';

  ngOnInit() {

    const savedApplications =
      localStorage.getItem('applications');

    if (savedApplications) {

      this.applications = JSON.parse(savedApplications);

    }

    this.filterApplications();

  }


  filterApplications() {

    this.filteredApplications = this.applications.filter(
      application => {

        const matchesSearch =
          application.company
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||

          application.jobTitle
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());


        const matchesStatus =
          !this.selectedStatus ||
          application.status === this.selectedStatus;


        const matchesJobType =
          !this.selectedJobType ||
          application.jobType === this.selectedJobType;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesJobType
        );

      }
    );

  }


  clearFilters() {

    this.searchTerm = '';

    this.selectedStatus = '';

    this.selectedJobType = '';

    this.filterApplications();

  }


  deleteApplication(index: number) {

    const confirmed = confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {
      return;
    }


    const applicationToDelete =
      this.filteredApplications[index];


    const originalIndex =
      this.applications.indexOf(applicationToDelete);


    if (originalIndex !== -1) {

      this.applications.splice(originalIndex, 1);

    }


    localStorage.setItem(
      'applications',
      JSON.stringify(this.applications)
    );


    this.filterApplications();

  }

}