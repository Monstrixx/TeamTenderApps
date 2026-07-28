export class CompanyAccessPolicy {
    public canExecuteCapability(userId: string, userRoles: string[], capabilityId: string): boolean {
        // ABAC / Capability policy evaluation
        if (capabilityId === "company.trust.verify" && !userRoles.includes("ADMIN") && !userRoles.includes("AUDITOR")) {
            return false;
        }
        return true;
    }
}
