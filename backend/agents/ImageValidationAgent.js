class ImageValidationAgent {
  async validateImage(imagePath) {
    const blurDetectionAgent = new (require('./BlurDetectionAgent'))();
    const decisionAgent = new (require('./DecisionAgent'))();
    const blurScore = await blurDetectionAgent.detectBlur(imagePath);
    return decisionAgent.makeDecision(blurScore);
  }
}

module.exports = ImageValidationAgent;