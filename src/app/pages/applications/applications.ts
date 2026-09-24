
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

  editId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      if (params['edit']) {

        this.editId = params['edit'];

        this.firestoreService
          .getApplications()
          .subscribe({
            next: (applications) => {

              const applicationToEdit =
                applications.find(
                  application =>
                    application.id === this.editId
                );

              if (applicationToEdit) {

                this.application = {
                  ...applicationToEdit
                };

              }

            },

            error: (error) => {

              console.error(
                'Error loading application:',
                error
              );

            }

          });

      }

    });

  }

  async addApplication() {

    this.companyError = '';
    this.jobTitleError = '';

    if (!this.application.company.trim()) {
      this.companyError =
        'Company name is required.';
    }

    if (!this.application.jobTitle.trim()) {
      this.jobTitleError =
        'Job title is required.';
    }

    if (this.companyError || this.jobTitleError) {
      return;
    }

    try {

      if (this.editId) {

        await this.firestoreService.updateApplication(
          this.editId,
          this.application
        );

      } else {

        await this.firestoreService.addApplication(
          this.application
        );

      }

      this.router.navigate([
        '/applications'
      ]);

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

