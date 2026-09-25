
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface UserSettings {

  name: string;

  email: string;

  targetRole: string;

  preferredLocation: string;

  preferredJobType: string;

  workPreference: string;

  defaultStatus: string;

  defaultPriority: string;

  compactMode: boolean;

}

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {

  private readonly settingsKey =
    'jobtrack-settings';

  settings: UserSettings = {

    name: '',

    email: '',

    targetRole:
      'Software Developer',

    preferredLocation:
      'Canada',

    preferredJobType:
      'Full-time',

    workPreference:
      'Remote',

    defaultStatus:
      'Applied',

    defaultPriority:
      'Medium',

    compactMode:
      false

  };

  saved = false;


  ngOnInit() {

    this.loadSettings();

  }


  /*
   * Load settings from localStorage.
   */

  loadSettings() {

    const savedSettings =
      localStorage.getItem(
        this.settingsKey
      );

    if (!savedSettings) {

      return;

    }

    try {

      const parsedSettings =
        JSON.parse(
          savedSettings
        );

      this.settings = {

        ...this.settings,

        ...parsedSettings

      };

    } catch (error) {

      console.error(
        'Error loading settings:',
        error
      );

    }

  }


  /*
   * Save settings.
   */

  saveSettings() {

    localStorage.setItem(

      this.settingsKey,

      JSON.stringify(
        this.settings
      )

    );

    this.saved = true;


    setTimeout(() => {

      this.saved = false;

    }, 2500);

  }


  /*
   * Reset settings to defaults.
   */

  resetSettings() {

    const confirmed =
      confirm(
        'Are you sure you want to reset your settings?'
      );

    if (!confirmed) {

      return;

    }

    this.settings = {

      name: '',

      email: '',

      targetRole:
        'Software Developer',

      preferredLocation:
        'Canada',

      preferredJobType:
        'Full-time',

      workPreference:
        'Remote',

      defaultStatus:
        'Applied',

      defaultPriority:
        'Medium',

      compactMode:
        false

    };

    this.saveSettings();

  }


  /*
   * Export applications
   * from localStorage.
   *
   * This also supports older
   * localStorage data if it exists.
   */

  exportApplications() {

    const applications =
      localStorage.getItem(
        'applications'
      );


    if (!applications) {

      alert(
        'No applications found to export.'
      );

      return;

    }


    const blob =
      new Blob(
        [applications],
        {
          type:
            'application/json'
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        'a'
      );

    link.href = url;

    link.download =
      'jobtrack-applications.json';

    link.click();


    URL.revokeObjectURL(
      url
    );

  }


  /*
   * Clear local application data.
   *
   * This does NOT delete Firestore
   * applications.
   */

  clearLocalData() {

    const confirmed =
      confirm(
        'This will remove locally stored application data from this browser. Continue?'
      );

    if (!confirmed) {

      return;

    }


    localStorage.removeItem(
      'applications'
    );


    alert(
      'Local application data has been cleared.'
    );

  }

}

