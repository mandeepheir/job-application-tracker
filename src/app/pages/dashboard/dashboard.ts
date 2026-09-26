
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Application } from '../../models/application';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  applications: Application[] = [];

  totalApplications = 0;
  interviews = 0;
  offers = 0;
  rejected = 0;
  upcomingDeadlines = 0;
  overdueApplications = 0;
  highPriorityApplications = 0;

  loading = true;
  errorMessage = '';

  constructor(
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {

    this.loading = true;

    this.errorMessage = '';

    this.firestoreService
      .getApplications()
      .subscribe({

        next: (applications) => {

          this.applications =
            applications;

          this.calculateStats();

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading dashboard applications:',
            error
          );

          this.loading = false;

          this.errorMessage =
            'We could not load your dashboard. Please check your connection and try again.';

        }

      });

  }

  calculateStats() {

    this.totalApplications =
      this.applications.length;

    this.interviews =
      this.applications.filter(
        application =>
          application.status === 'Interview' ||
          application.status === 'Technical'
      ).length;

    this.offers =
      this.applications.filter(
        application =>
          application.status === 'Offer'
      ).length;

    this.rejected =
      this.applications.filter(
        application =>
          application.status === 'Rejected'
      ).length;

    this.upcomingDeadlines =
      this.applications.filter(
        application =>
          this.getDeadlineStatus(
            application.deadline
          ) === 'Upcoming'
      ).length;

    this.overdueApplications =
      this.applications.filter(
        application =>
          this.getDeadlineStatus(
            application.deadline
          ) === 'Overdue'
      ).length;

    this.highPriorityApplications =
      this.applications.filter(
        application =>
          application.priority === 'High'
      ).length;

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

    const deadlineDate =
      new Date(
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

  getRecentApplications(): Application[] {

    return this.applications
      .slice()
      .reverse()
      .slice(0, 5);

  }

}

