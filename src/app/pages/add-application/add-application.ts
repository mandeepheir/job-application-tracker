
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

  private readonly settingsKey =
    'jobtrack-settings';


  application: Application = {

    company: '',

    jobTitle: '',

    location: '',

    jobUrl: '',

    applicationDate: '',

    deadline: '',

    priority: 'Medium',

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

    this.route.queryParamMap.subscribe(
      params => {

        const id =
          params.get('edit');


        /*
         * If editing an existing
         * application, load that
         * application.
         */

        if (id) {

          this.editId = id;

          this.loadApplicationForEdit();

          return;

        }


        /*
         * Otherwise apply the
         * user's saved defaults.
         */

        this.loadSavedDefaults();

      }
    );

  }


  /*
   * Load user's saved settings.
   */

  private loadSavedDefaults() {

    const savedSettings =
      localStorage.getItem(
        this.settingsKey
      );


    if (!savedSettings) {

      return;

    }


    try {

      const settings =
        JSON.parse(
          savedSettings
        );


      if (
        settings.defaultStatus
      ) {

        this.application.status =
          settings.defaultStatus;

      }


      if (
        settings.defaultPriority
      ) {

        this.application.priority =
          settings.defaultPriority;

      }


    } catch (error) {

      console.error(
        'Error loading saved settings:',
        error
      );

    }

  }


  /*
   * Load an existing application
   * when editing.
   */

  private loadApplicationForEdit() {

    this.firestoreService
      .getApplications()
      .subscribe({

        next: (applications) => {

          const applicationToEdit =
            applications.find(
              application =>
                application.id ===
                this.editId
            );


          if (!applicationToEdit) {

            console.error(
              'Application not found:',
              this.editId
            );

            return;

          }


          this.application = {

            company:
              applicationToEdit.company,

            jobTitle:
              applicationToEdit.jobTitle,

            location:
              applicationToEdit.location,

            jobUrl:
              applicationToEdit.jobUrl,

            applicationDate:
              applicationToEdit.applicationDate,

            deadline:
              applicationToEdit.deadline ||
              '',

            priority:
              applicationToEdit.priority ||
              'Medium',

            status:
              applicationToEdit.status,

            jobType:
              applicationToEdit.jobType,

            notes:
              applicationToEdit.notes

          };

        },


        error: (error) => {

          console.error(
            'Error loading application:',
            error
          );

        }

      });

  }


  /*
   * Save application.
   */

  async addApplication() {

    this.companyError = '';

    this.jobTitleError = '';


    /*
     * Validate company.
     */

    if (
      !this.application.company.trim()
    ) {

      this.companyError =
        'Company name is required.';

    }


    /*
     * Validate job title.
     */

    if (
      !this.application.jobTitle.trim()
    ) {

      this.jobTitleError =
        'Job title is required.';

    }


    /*
     * Stop if validation fails.
     */

    if (
      this.companyError ||
      this.jobTitleError
    ) {

      return;

    }


    try {


      /*
       * Update existing application.
       */

      if (this.editId) {

        await this.firestoreService
          .updateApplication(
            this.editId,
            this.application
          );

      }


      /*
       * Create new application.
       */

      else {

        await this.firestoreService
          .addApplication(
            this.application
          );

      }


      /*
       * Return to applications.
       */

      await this.router.navigate([
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

