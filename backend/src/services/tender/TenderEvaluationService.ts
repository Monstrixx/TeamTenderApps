import prisma from '../../database/prisma';

export class TenderEvaluationService {
  /**
   * Saves a human evaluation for a supplier's bid.
   */
  async saveManualEvaluation(tenderId: string, supplierId: string, data: {
    technicalScore: number;
    financialScore: number;
    manualScore: number; // Discretionary manual adjustment
    evaluationNotes?: string;
    evaluatedBy: string;
  }) {
    // In a real application we would check if a record already exists 
    // and use an upsert. For simplicity, we create or update manually.
    
    const existing = await prisma.tenderEvaluation.findFirst({
      where: { tenderId, supplierId }
    });

    const totalScore = this.calculateTotal(data.technicalScore, data.financialScore, data.manualScore, Number(existing?.aiFinalScore || 0));

    if (existing) {
      return prisma.tenderEvaluation.update({
        where: { id: existing.id },
        data: {
          technicalScore: data.technicalScore,
          financialScore: data.financialScore,
          manualScore: data.manualScore,
          totalScore,
          evaluationNotes: data.evaluationNotes,
          evaluatedBy: data.evaluatedBy,
          evaluatedAt: new Date()
        }
      });
    } else {
      return prisma.tenderEvaluation.create({
        data: {
          tenderId,
          supplierId,
          technicalScore: data.technicalScore,
          financialScore: data.financialScore,
          manualScore: data.manualScore,
          totalScore,
          evaluationNotes: data.evaluationNotes,
          evaluatedBy: data.evaluatedBy
        }
      });
    }
  }

  /**
   * Called by the Wave 6 Recommendation Engine to inject AI scoring.
   */
  async saveAIEvaluation(tenderId: string, supplierId: string, data: {
    aiPersonnelScore: number;
    aiEquipmentScore: number;
    aiDocumentScore: number;
    aiRiskScore: number;
    aiFinalScore: number;
  }) {
    const existing = await prisma.tenderEvaluation.findFirst({
      where: { tenderId, supplierId }
    });

    const manualComponent = existing ? this.calculateManualTotal(existing) : 0;
    const totalScore = this.calculateTotal(
      existing?.technicalScore ? Number(existing.technicalScore) : 0, 
      existing?.financialScore ? Number(existing.financialScore) : 0, 
      existing?.manualScore ? Number(existing.manualScore) : 0, 
      data.aiFinalScore
    );

    if (existing) {
      return prisma.tenderEvaluation.update({
        where: { id: existing.id },
        data: {
          ...data,
          totalScore
        }
      });
    } else {
      return prisma.tenderEvaluation.create({
        data: {
          tenderId,
          supplierId,
          ...data,
          totalScore
        }
      });
    }
  }

  private calculateManualTotal(evaluation: any): number {
    return Number(evaluation.technicalScore) + Number(evaluation.financialScore) + Number(evaluation.manualScore);
  }

  private calculateTotal(tech: number, fin: number, manual: number, aiFinal: number): number {
    // A simplified weighted total for example purposes
    return (tech * 0.4) + (fin * 0.4) + (manual * 0.1) + (aiFinal * 0.1);
  }
}

export default new TenderEvaluationService();
