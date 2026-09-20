
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
      console.log('Loaded applications from localStorage:', this.applications);
    }

  }

}

