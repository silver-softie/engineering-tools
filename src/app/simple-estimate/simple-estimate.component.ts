import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


enum Complexity {
  Small,
  Medium,
  Large,
  ExtraLarge
}

enum Uncertainty {
  Low,
  Moderate,
  High,
  Extreme
}

interface Task {
  name: string,
  complexity: Complexity,
  uncertainty: Uncertainty,
  expected?: number,
  worstCase?: number
}

declare var bootstrap: any;

@Component({
  selector: 'app-simple-estimate',
  imports: [CommonModule, FormsModule, ConfirmationDialogComponent],
  templateUrl: './simple-estimate.component.html',
  styleUrl: './simple-estimate.component.css'
})
export class SimpleEstimateComponent {
  tasks: Task[] = [];

  Complexity = Complexity;

  complexityKeys: (keyof typeof Complexity)[] = Object.keys(Complexity).filter(
    key => isNaN(Number(key))
  ) as (keyof typeof Complexity)[];

  Uncertainty = Uncertainty;

  uncertaintyKeys: (keyof typeof Uncertainty)[] = Object.keys(Uncertainty).filter(
    key => isNaN(Number(key))
  ) as (keyof typeof Uncertainty)[];

  complexityDuration: Record<Complexity, number> = {
    [Complexity.Small]: 1.0,
    [Complexity.Medium]: 3.0,
    [Complexity.Large]: 5.0,
    [Complexity.ExtraLarge]: 10.0
  };

  uncertaintyMultipliers: Record<Uncertainty, number> = {
    [Uncertainty.Low]: 1.1,
    [Uncertainty.Moderate]: 1.5,
    [Uncertainty.High]: 2.0,
    [Uncertainty.Extreme]: 5.0
  };



  addTask() {
    this.tasks.push({
      name: 'New task',
      complexity: Complexity.Small,
      uncertainty: Uncertainty.Low,
      expected: this.complexityDuration[Complexity.Small],
      worstCase: this.uncertaintyMultipliers[Uncertainty.Low]
    });
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  handleConfirmation(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.tasks = [];
      console.log('Estimate reset.');
    }
  }

  updateComplexity(task: Task, key: string): void {
    task.complexity = Complexity[key as keyof typeof Complexity];
    this.recalculateTask(task);
  }

  updateUncertainty(task: Task, key: string): void {
    task.uncertainty = Uncertainty[key as keyof typeof Uncertainty];
    this.recalculateTask(task);
  }

  reset(): void {
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true
      });
      modal.show();
      console.log('Modal is displayed.');
    } else {
      console.error('Modal element not found in the DOM.');
    }
  }

  private recalculateTask(task: Task) {
    task.expected = this.complexityDuration[task.complexity];
    task.worstCase = this.complexityDuration[task.complexity] * this.uncertaintyMultipliers[task.uncertainty];
  }

  get sumExpected(): number {
    return this.tasks.reduce((totalExpected: number, task: Task) => {
      return totalExpected + (task.expected ?? 0); // Use 0 if task.expected is undefined
    }, 0);
  }

  get sumWorstCase(): number {
    return this.tasks.reduce((totalWorstCase: number, task: Task) => {
      return totalWorstCase + (task.worstCase ?? 0); // Use 0 if task.worstCase is undefined
    }, 0);
  }
}
