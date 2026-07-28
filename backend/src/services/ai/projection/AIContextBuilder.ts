export class AIContextBuilder {
  public static buildContext(projection: any, allowedSections: string[]): any {
    const context: any = {
      fingerprint: projection.fingerprint,
      data: {}
    };
    
    for (const section of allowedSections) {
      if (projection.data[section] !== undefined) {
        context.data[section] = projection.data[section];
      }
    }
    
    return context;
  }
}
