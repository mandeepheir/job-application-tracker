import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application';

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
    private route: ActivatedRoute
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

    if (this.editIndex !== null) {

      existingApplications[this.editIndex] = {
        ...this.application
      };

    } else {

      existingApplications.push({
        ...this.application
      });

    }

    localStorage.setItem(
      'applications',
      JSON.stringify(existingApplications)
    );

    this.router.navigate(['/applications']);

  }

}