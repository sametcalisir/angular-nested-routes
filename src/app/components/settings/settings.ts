import {
  CanComponentDeactivate,
  canDeactivateGuard,
} from '../../guards/can-deactivate-guard';
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements CanComponentDeactivate {
  settings = signal({
    emailNotifications: true,
    darkMode: false,
    autoSave: true,
  });

  private originalSettings = signal({
    emailNotifications: true,
    darkMode: false,
    autoSave: true,
  });

  hasUnsavedChanges = computed(() => {
    return (
      JSON.stringify(this.settings()) !==
      JSON.stringify(this.originalSettings())
    );
  });

  updateSetting(key: string, event: any): void {
    this.settings.update((current) => ({
      ...current,
      [key]: event.target.checked,
    }));
  }

  saveSettings(): void {
    console.log('Settings saved:', this.settings());
    this.originalSettings.set({ ...this.settings() });
    alert('Settings saved successfully!');
  }

  resetSettings(): void {
    this.settings.set({ ...this.originalSettings() });
  }

  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
    }
    return true;
  }
}
