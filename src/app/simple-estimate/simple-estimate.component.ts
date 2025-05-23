import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-simple-estimate',
  imports: [CommonModule, FormsModule],
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

  exportEstimate() {
    // Prepare CSV Headers
    const taskHeaders = ['Name', 'Complexity', 'Uncertainty', 'Expected', 'WorstCase'];
    const summaryHeaders = ['', '', '', 'SumExpected', 'SumWorstCase'];

    // Generate CSV Rows for Tasks
    const taskRows = this.tasks.map(task =>
      [task.name, task.complexity, task.uncertainty, task.expected, task.worstCase].join(',')
    );

    // Generate CSV Row for Summary
    const summaryRow = ['', '', '', this.sumExpected, this.sumWorstCase].join(',');

    // Combine Everything into the CSV Format
    const csvData = [
      taskHeaders.join(','), // Task headers
      ...taskRows, // Task rows
      '', // Blank line for separation
      summaryHeaders.join(','), // Summary headers
      summaryRow, // Summary row
    ].join('\n');

    // Trigger File Download
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'estimate.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  updateComplexity(task: Task, key: string): void {
    task.complexity = Complexity[key as keyof typeof Complexity];
    this.recalculateTask(task);
  }

  updateUncertainty(task: Task, key: string): void {
    task.uncertainty = Uncertainty[key as keyof typeof Uncertainty];
    this.recalculateTask(task);
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
