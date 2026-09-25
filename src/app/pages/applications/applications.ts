import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Application } from '../../models/application';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-applications',
  imports: [FormsModule, RouterLink],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {

  applications: Application[] = [];

  filteredApplications: Application[] = [];

  searchTerm = '';

  selectedStatus = '';

  selectedJobType = '';

  constructor(
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {

    this.firestoreService
      .getApplications()
      .subscribe({

        next: (applications) => {

          this.applications = applications;

          this.filterApplications();

        },

        error: (error) => {

          console.error(
            'Error loading applications:',
            error
          );

        }

      });

  }

  filterApplications() {

    this.filteredApplications =
      this.applications.filter(
        application => {

          const matchesSearch =
            application.company
              .toLowerCase()
              .includes(
                this.searchTerm.toLowerCase()
              ) ||

            application.jobTitle
              .toLowerCase()
              .includes(
                this.searchTerm.toLowerCase()
              );

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

  getDeadlineStatus(
    deadline: string
  ): string {

    if (!deadline) {
      return '';
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const deadlineDate = new Date(
      deadline + 'T00:00:00'
    );

    if (deadlineDate < today) {

      return 'Overdue';

    }

    if (
      deadlineDate.getTime() ===
      today.getTime()
    ) {

      return 'Due Today';

    }

    return 'Upcoming';

  }

  getDeadlineClass(
    deadline: string
  ): string {

    const status =
      this.getDeadlineStatus(deadline);

    if (status === 'Overdue') {

      return 'deadline-overdue';

    }

    if (status === 'Due Today') {

      return 'deadline-today';

    }

    if (status === 'Upcoming') {

      return 'deadline-upcoming';

    }

    return '';

  }

  async deleteApplication(
    index: number
  ) {

    const confirmed = confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {

      return;

    }

    const applicationToDelete =
      this.filteredApplications[index];

    if (!applicationToDelete?.id) {

      console.error(
        'Application ID is missing.'
      );

      return;

    }

    try {

      await this.firestoreService.deleteApplication(
        applicationToDelete.id
      );

    } catch (error) {

      console.error(
        'Error deleting application:',
        error
      );

      alert(
        'There was a problem deleting the application.'
      );

    }

  }

}