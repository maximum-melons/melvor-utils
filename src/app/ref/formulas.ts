const xpDiffFromPriorLevel = function(level: number): number {
    if (level == 99) {
        return 0;
    }

    return Math.round(
        0.25 * (
            (level - 1) + 300 *
            Math.pow(
                2,
                ((level - 1) / 7)
            )
        )
    );
};

export {
    xpDiffFromPriorLevel
}