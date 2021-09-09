import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'XP Between Calculator';

  xpForm = this.formBuilder.group({
    currentXp: 0,
    nextLevelXp: 0,
    incrementXp: 0,
    incrementTimeSeconds: 0,
    remainingXp: 0,
    remainingIncrements: 0,
    remainingTimeMinutes: 0
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    if (this.hasAllRequired()) {
      this.calculateAll();
    }
  }

  hasAllRequired(): boolean {
    return this.xpForm.get('currentXp').value && this.xpForm.get('currentXp').value >= 0
      && this.xpForm.get('nextLevelXp').value && this.xpForm.get('nextLevelXp').value > 0
      && this.xpForm.get('incrementXp').value && this.xpForm.get('incrementXp').value > 0
      && this.xpForm.get('incrementTimeSeconds').value && this.xpForm.get('incrementTimeSeconds').value > 0;
  }

  calculateAll(): void {
    this.xpForm.get('remainingXp').setValue(this.xpForm.get('nextLevelXp').value - this.xpForm.get('currentXp').value);
    this.xpForm.get('remainingIncrements').setValue(this.xpForm.get('remainingXp').value / this.xpForm.get('incrementXp').value);
    this.xpForm.get('remainingTimeMinutes').setValue(
      this.roundNumber(
        (this.xpForm.get('remainingIncrements').value * this.xpForm.get('incrementTimeSeconds').value) / 60)
    );
  }

  roundNumber(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }
}
