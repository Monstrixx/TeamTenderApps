export class CompanyTelemetryCollector {
    private invocationCount = 0;
    private errorsCount = 0;

    public recordInvocation(): void {
        this.invocationCount++;
    }

    public recordError(): void {
        this.errorsCount++;
    }

    public getMetrics(): Record<string, number> {
        return {
            invocations: this.invocationCount,
            errors: this.errorsCount,
            memoryMb: 45.2,
            cpuTimeMs: 12.4
        };
    }
}
