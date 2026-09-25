import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Application } from '../../models/application';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-application-details',
  imports: [RouterLink],
  templateUrl: './application-details.html',
  styleUrl: './application-details.css'
})
export class ApplicationDetails implements OnInit {

  application: Application | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.firestoreService
      .getApplications()
      .subscribe({

        next: (applications) => {

          this.application =
            applications.find(
              application =>
                application.id === id
            ) || null;

        },

        error: (error) => {

          console.error(
            'Error loading application:',
            error
          );

        }

      });

  }

}