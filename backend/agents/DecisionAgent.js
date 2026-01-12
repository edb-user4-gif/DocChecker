class DecisionAgent {
  constructor(threshold = 100) {
    this.threshold = threshold;
  }

  makeDecision(blurScore) {
    if (isNaN(blurScore)) blurScore = 0;
    const blurPercentage = Math.max(0, Math.min(100, ((this.threshold - blurScore) / this.threshold * 100)));
    const result = blurScore >= this.threshold ? 'VALID' : 'BLUR';
    return { result, blurPercentage: Math.round(blurPercentage) };
  }
}

module.exports = DecisionAgent;