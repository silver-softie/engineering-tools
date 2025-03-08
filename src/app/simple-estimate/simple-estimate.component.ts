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
  tasks: Task[] = [
    { name: 'Refactor the doodad', complexity: Complexity.Small, uncertainty: Uncertainty.Low, expected: 1.1, worstCase: 3 },
    { name: 'Swizzle columns', complexity: Complexity.Large, uncertainty: Uncertainty.Moderate, expected: 1.1, worstCase: 3 },
    { name: 'Reticulate splines', complexity: Complexity.Medium, uncertainty: Uncertainty.Extreme, expected: 1.1, worstCase: 3 },
    { name: 'Reverse manifold intake', complexity: Complexity.Medium, uncertainty: Uncertainty.Moderate, expected: 1.1, worstCase: 3 },
    { name: 'Deploy', complexity: Complexity.Small, uncertainty: Uncertainty.Low, expected: 1.1, worstCase: 3 }
  ];

  addTask() {
    this.tasks.push({ name: 'Deploy', complexity: Complexity.Small, uncertainty: Uncertainty.Low, expected: 1.1, worstCase: 3 });
  }

  removeTask() {

  }
}
