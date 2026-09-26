
import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';

import {
  Auth,
  user
} from '@angular/fire/auth';

import {
  Observable,
  switchMap,
  take,
  firstValueFrom
} from 'rxjs';

import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  getApplications(): Observable<Application[]> {

    return user(this.auth).pipe(

      take(1),

      switchMap(currentUser => {

        if (!currentUser) {
          throw new Error(
            'User is not logged in.'
          );
        }

        const applicationsCollection =
          collection(
            this.firestore,
            'applications'
          );

        const applicationsQuery =
          query(
            applicationsCollection,
            where(
              'userId',
              '==',
              currentUser.uid
            )
          );

        return collectionData(
          applicationsQuery,
          {
            idField: 'id'
          }
        ) as Observable<Application[]>;

      })

    );
  }


  private async getCurrentUser() {

    const currentUser =
      await firstValueFrom(
        user(this.auth).pipe(
          take(1)
        )
      );

    if (!currentUser) {
      throw new Error(
        'User is not logged in.'
      );
    }

    return currentUser;
  }


  async addApplication(
    application: Application
  ) {

    const currentUser =
      await this.getCurrentUser();

    const applicationsCollection =
      collection(
        this.firestore,
        'applications'
      );

    const applicationData = {
      ...application,
      userId: currentUser.uid
    };

    delete applicationData.id;

    return addDoc(
      applicationsCollection,
      applicationData
    );
  }


  async updateApplication(
    id: string,
    application: Application
  ) {

    const currentUser =
      await this.getCurrentUser();

    const applicationDocument =
      doc(
        this.firestore,
        `applications/${id}`
      );

    const applicationData = {
      ...application,
      userId: currentUser.uid
    };

    delete applicationData.id;

    return updateDoc(
      applicationDocument,
      applicationData
    );
  }


  async deleteApplication(
    id: string
  ) {

    await this.getCurrentUser();

    const applicationDocument =
      doc(
        this.firestore,
        `applications/${id}`
      );

    return deleteDoc(
      applicationDocument
    );
  }

}

