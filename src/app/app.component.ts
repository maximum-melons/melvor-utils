import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { XpLevel } from './ref/xp-level';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'XP Between Calculator';
  calcType: string;
  xpForm: FormGroup;

  // level input
  currentLevel: number;
  nextLevel: number;

  // xp input
  currentLevelXp: number;
  nextLevelXp: number;

  // common input
  incrementXp: number;
  incrementTimeSeconds: number;
  
  // common output
  remainingXp: number;
  remainingIncrements: number;
  remainingTimeMinutes: number;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.xpForm = this.formBuilder.group({
      calcType: this.calcType,
      currentLevel: this.currentLevel,
      nextLevel: this.nextLevel,
      currentLevelXp: this.currentLevelXp,
      nextLevelXp: this.nextLevelXp,
      incrementXp: this.incrementXp,
      incrementTimeSeconds: this.incrementTimeSeconds,
      remainingXp: this.remainingXp,
      remainingIncrements: this.remainingIncrements,
      remainingTimeMinutes: this.remainingTimeMinutes
    });
  }

  ngOnInit() {
    Object.keys(this.xpForm.controls).forEach(
      (controlName) => {
        this.xpForm.get(controlName).valueChanges.subscribe(val => {
          console.log(controlName);
          this[controlName] = val;
        });
      }
    );
  }

  setValue(controlName: string, value: any) {
    this[controlName] = value;
    this.xpForm.get(controlName).setValue(this[controlName]);

    console.log('changed value (' + controlName + '): ' +  this.xpForm.get(controlName).value);
  }

  onSubmit(): void {
    if (this.hasAllRequired()) {
      this.calculateAll();
    }
  }

  hasAllRequired(): boolean {
    const conditionalCheck = this.calcType === 'level'
      ? (
        this.currentLevel && this.currentLevel >= 0
        && this.nextLevel && this.nextLevel > 0
      )
      : (
        this.currentLevelXp && this.currentLevelXp >= 0
        && this.nextLevelXp && this.nextLevelXp > 0
      )
    return conditionalCheck
      && this.incrementXp && this.incrementXp > 0
      && this.incrementTimeSeconds && this.incrementTimeSeconds > 0;
  }

  calculateAll(): void {
    if (this.calcType === 'level') {
      this.calculateByLevel();
    } else {
      this.calculateByXp();
    }
  }

  calculateByXp(): void {
    this.setValue('remainingXp', this.nextLevelXp - this.currentLevelXp);
    this.setValue('remainingIncrements', this.remainingXp / this.incrementXp);
    this.setValue('remainingTimeMinutes', this.roundNumber(
        (this.remainingIncrements * this.incrementTimeSeconds) / 60
      )
    );
  }

  calculateByLevel(): void {
    const levelUtil = new XpLevel();
    this.setValue('remainingXp', levelUtil.get(this.nextLevel).xp - levelUtil.get(this.currentLevel).xp);
    this.setValue('remainingIncrements', this.remainingXp / this.incrementXp);
    this.setValue('remainingTimeMinutes', this.roundNumber(
        (this.remainingIncrements * this.incrementTimeSeconds) / 60
      )
    );
  }

  roundNumber(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }
}
