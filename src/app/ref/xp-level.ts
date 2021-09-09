import * as formulas from './formulas';

interface LevelType {
    level: number,
    xp: number,
    xpToNext: number
}

export class XpLevel {
    levelCap: number;
    levels: Array<LevelType>;
    
    constructor() {
        this.levelCap = 99;
        this.levels = this.populateLevels();
    }

    get(level: number) {
        return this.levels.find(
            (l) => l.level == level
        );
    }

    populateLevels(): Array<LevelType> {
        const populatedLevels = [];
        let thisLevel = 1;
        let runningXp = 0;
        while (thisLevel <= this.levelCap) {
            let nextLevelXp = this.calculateXpToNext(thisLevel + 1) // increment as we want xp to the next
            populatedLevels.push({
                level: thisLevel,
                xp: runningXp,
                xpToNext: nextLevelXp
            });
            runningXp += nextLevelXp;
            thisLevel++;
        }

        return populatedLevels;
    }

    calculateXpToNext(level: number): number {
        return formulas.xpDiffFromPriorLevel(level);
    }
}