import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  getApplications(): Observable<Application[]> {

    const applicationsCollection =
      collection(this.firestore, 'applications');

    return collectionData(
      applicationsCollection,
      { idField: 'id' }
    ) as Observable<Application[]>;
  }

  addApplication(application: Application) {

    const applicationsCollection =
      collection(this.firestore, 'applications');

    return addDoc(
      applicationsCollection,
      application
    );
  }

  updateApplication(
    id: string,
    application: Application
  ) {

    const applicationDocument =
      doc(this.firestore, `applications/${id}`);

    return updateDoc(
      applicationDocument,
      { ...application }
    );
  }

  deleteApplication(id: string) {

    const applicationDocument =
      doc(this.firestore, `applications/${id}`);

    return deleteDoc(applicationDocument);
  }

}