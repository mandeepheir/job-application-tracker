import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Application } from '../../models/application';

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


  ngOnInit() {

    this.loadApplications();

  }


  loadApplications() {

    const savedApplications =
      localStorage.getItem('applications');

    if (savedApplications) {

      this.applications =
        JSON.parse(savedApplications);

    }

    this.calculateStats();

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

  }


  getRecentApplications(): Application[] {

    return this.applications
      .slice()
      .reverse()
      .slice(0, 5);

  }

}