import {
  Injectable,
  Injector,
  runInInjectionContext
} from '@angular/core';

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
  Auth
} from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore,
    private injector: Injector,
    private auth: Auth
  ) {}

  getApplications(): Observable<Application[]> {

    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in.');
    }

    return runInInjectionContext(
      this.injector,
      () => {

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
              user.uid
            )
          );

        return collectionData(
          applicationsQuery,
          { idField: 'id' }
        ) as Observable<Application[]>;

      }
    );

  }

  addApplication(
    application: Application
  ) {

    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in.');
    }

    const applicationsCollection =
      collection(
        this.firestore,
        'applications'
      );

    const applicationData = {
      ...application,
      userId: user.uid
    };

    delete applicationData.id;

    return addDoc(
      applicationsCollection,
      applicationData
    );

  }

  updateApplication(
    id: string,
    application: Application
  ) {

    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in.');
    }

    const applicationDocument =
      doc(
        this.firestore,
        `applications/${id}`
      );

    const applicationData = {
      ...application,
      userId: user.uid
    };

    delete applicationData.id;

    return updateDoc(
      applicationDocument,
      applicationData
    );

  }

  deleteApplication(
    id: string
  ) {

    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in.');
    }

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