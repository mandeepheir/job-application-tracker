import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Application } from '../../models/application';

@Component({
  selector: 'app-applications',
  imports: [RouterLink],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications {

  applications: Application[] = [];

  ngOnInit() {

    const savedApplications =
      localStorage.getItem('applications');

    if (savedApplications) {
      this.applications = JSON.parse(savedApplications);
    }

  }

  deleteApplication(index: number) {

    const confirmed = confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {
      return;
    }

    this.applications.splice(index, 1);

    localStorage.setItem(
      'applications',
      JSON.stringify(this.applications)
    );

  }

}