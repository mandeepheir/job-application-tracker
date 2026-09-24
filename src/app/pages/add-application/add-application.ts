import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Application } from '../../models/application';

@Component({
  selector: 'app-add-application',
  imports: [FormsModule],
  templateUrl: './add-application.html',
  styleUrl: './add-application.css'
})
export class AddApplication {
  constructor(private router: Router) {}


  application: Application = {
    company: '',
    jobTitle: '',
    location: '',
    jobUrl: '',
    applicationDate: '',
    status: 'Applied',
    jobType: 'Full-time',
    notes: ''
  };

  companyError = '';
  jobTitleError = '';

  addApplication() {

    this.companyError = '';
    this.jobTitleError = '';

    if (!this.application.company.trim()) {
      this.companyError = 'Company name is required.';
    }

    if (!this.application.jobTitle.trim()) {
      this.jobTitleError = 'Job title is required.';
    }

    if (this.companyError || this.jobTitleError) {
      return;
    }

    const existingApplications =
      JSON.parse(localStorage.getItem('applications') || '[]');

    existingApplications.push({
      ...this.application
    });

    localStorage.setItem(
      'applications',
      JSON.stringify(existingApplications)
    );

    console.log('Application saved:', this.application);
    this.application = {
  company: '',
  jobTitle: '',
  location: '',
  jobUrl: '',
  applicationDate: '',
  status: 'Applied',
  jobType: 'Full-time',
  notes: ''
};
    this.router.navigate(['/applications']);
  }

}