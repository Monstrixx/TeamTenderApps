import crypto from 'crypto';

export interface IProjectionSectionBuilder {
  name: string;
  build(entityId: string): Promise<any>;
}

export class AIKnowledgeProjectionBuilder {
  private sections: IProjectionSectionBuilder[] = [];

  public registerSection(section: IProjectionSectionBuilder) {
    this.sections.push(section);
  }

  public async buildProjection(entityId: string): Promise<any> {
    const projection: any = {};
    
    for (const section of this.sections) {
      projection[section.name] = await section.build(entityId);
    }
    
    // Generate Fingerprint
    const hash = crypto.createHash('sha256').update(JSON.stringify(projection)).digest('hex');
    
    return {
      fingerprint: {
        hash,
        version: "1.0",
        generatedAt: new Date().toISOString()
      },
      data: projection
    };
  }
}
