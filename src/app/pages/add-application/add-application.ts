
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Application } from '../../models/application';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-add-application',
  imports: [FormsModule],
  templateUrl: './add-application.html',
  styleUrl: './add-application.css'
})
export class AddApplication implements OnInit {

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

  editIndex: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      if (params['edit'] !== undefined) {

        this.editIndex = Number(params['edit']);

        const savedApplications =
          localStorage.getItem('applications');

        if (savedApplications) {

          const applications: Application[] =
            JSON.parse(savedApplications);

          if (
            this.editIndex >= 0 &&
            this.editIndex < applications.length
          ) {

            this.application = {
              ...applications[this.editIndex]
            };

          }

        }

      }

    });

  }

  async addApplication() {

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

    try {

      if (this.editIndex !== null) {

        const savedApplications =
          JSON.parse(
            localStorage.getItem('applications') || '[]'
          );

        const existingApplication =
          savedApplications[this.editIndex];

        if (existingApplication?.id) {

          await this.firestoreService.updateApplication(
            existingApplication.id,
            this.application
          );

        }

      } else {

        await this.firestoreService.addApplication(
          this.application
        );

      }

      this.router.navigate(['/applications']);

    } catch (error) {

      console.error(
        'Error saving application:',
        error
      );

      alert(
        'There was a problem saving the application.'
      );

    }

  }

}

