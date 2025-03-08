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
    { name: 'Refactor the doodad', complexity: Complexity.Small, uncertainty: Uncertainty.Low },
    { name: 'Swizzle columns', complexity: Complexity.Large, uncertainty: Uncertainty.Moderate },
    { name: 'Reticulate splines', complexity: Complexity.Medium, uncertainty: Uncertainty.Extreme },
    { name: 'Reverse manifold intake', complexity: Complexity.Medium, uncertainty: Uncertainty.Moderate },
    { name: 'Deploy', complexity: Complexity.Small, uncertainty: Uncertainty.Low }
  ];

  addTask() {

  }

  removeTask() {

  }
}
