import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { XpLevel } from '../../ref/xp-level';
import * as time from '../../ref/time';

interface DisplayObject {
  rawValue: number,
  displayValue: Function
}

@Component({
  selector: 'page-xp-between',
  templateUrl: './xp-between.component.html',
  styleUrls: ['./xp-between.component.css']
})
export class XPBetweenComponent implements OnInit {
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
  remainingTimeSeconds: number;

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
      remainingTimeSeconds: this.remainingTimeSeconds
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
    this.setValue('remainingTimeSeconds', this.remainingIncrements * this.incrementTimeSeconds);
  }

  calculateByLevel(): void {
    const levelUtil = new XpLevel();
    this.setValue('remainingXp', levelUtil.get(this.nextLevel).xp - levelUtil.get(this.currentLevel).xp);
    this.setValue('remainingIncrements', this.remainingXp / this.incrementXp);
    this.setValue('remainingTimeSeconds', this.remainingIncrements * this.incrementTimeSeconds);
  }

  roundNumber(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  numericDisplayObject(value: number): DisplayObject {
    return {
      rawValue: value,
      displayValue: function() {
        return Math.floor(value)
      }
    }
  }

  getDurationDays(n: number): DisplayObject {
    return this.numericDisplayObject(
      n / time.SECONDS_IN_DAY
    );
  }

  getDurationHours(n: number): DisplayObject {
    const dayCalcRemainder = (this.getDurationDays(n).rawValue - Math.floor(this.getDurationDays(n).rawValue))
      * time.SECONDS_IN_DAY;
    
    return this.numericDisplayObject(
      dayCalcRemainder > 0
      ? dayCalcRemainder / time.SECONDS_IN_HOUR
      : 0
    );
  }

  getDurationMinutes(n: number): DisplayObject {
    const hourCalcRemainder = (this.getDurationHours(n).rawValue - Math.floor(this.getDurationHours(n).rawValue))
      * time.SECONDS_IN_HOUR;
    
    return this.numericDisplayObject(
      hourCalcRemainder > 0
      ? this.roundNumber(hourCalcRemainder / time.SECONDS_IN_MINUTE) // deliberately round the raw value as the last display value
      : 0
    );
  }
}
