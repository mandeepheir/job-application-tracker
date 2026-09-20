
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Application } from '../../models/application';

@Component({
  selector: 'app-add-application',
  imports: [FormsModule],
  templateUrl: './add-application.html',
  styleUrl: './add-application.css'
})
export class AddApplication {

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

  addApplication() {

    const existingApplications =
      JSON.parse(localStorage.getItem('applications') || '[]');

    existingApplications.push(this.application);

    localStorage.setItem(
      'applications',
      JSON.stringify(existingApplications)
    );

    console.log('Application saved:', this.application);

  }

}
