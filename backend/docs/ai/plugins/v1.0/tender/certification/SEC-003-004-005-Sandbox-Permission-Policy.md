# SEC-003 — Sandbox Validation
# SEC-004 — Permission Validation
# SEC-005 — Policy Validation
## Tender Plugin v1.0

> **Date:** 2026-07-29

---

# SEC-003 — Sandbox Validation

## Sandbox Enforcement Results

| Check | Method | Result |
|---|---|---|
| Plugin cannot exceed `maxMemoryMb: 512` | PluginContainer quota | ✅ Enforced |
| Plugin cannot exceed `maxCpuTimeMs: 10000` | PluginContainer quota | ✅ Enforced |
| Plugin cannot exceed `maxConcurrentAgents: 3` | RuntimeScheduler limit | ✅ Enforced |
| Plugin filesystem access | Sandboxed to workspace | ✅ Enforced |
| Plugin cannot spawn new processes outside AgentRuntime | ProcessManager gate | ✅ Enforced |
| Plugin cannot call other plugins directly | No import path exists | ✅ Enforced |

**Verdict: ✅ PASS — Sandbox fully enforced by PluginContainer v1.0**

---

# SEC-004 — Permission Validation

## Required Permissions

| Permission | Declared | Used By | Justification |
|---|---|---|---|
| `READ` | ✅ | All capabilities | Read knowledge and projections |
| `WRITE` | ✅ | Artifact storage | Store eligibility/bid/recommendation artifacts |
| `TENDER_MANAGE` | ✅ | Workspace capability | Create and manage tender workspaces |

## Permission Least Privilege Check

| Check | Status |
|---|---|
| No `ADMIN` permission claimed | ✅ |
| No `KERNEL_ACCESS` permission claimed | ✅ |
| No `COMPANY_WRITE` permission claimed | ✅ (Read Model only) |
| All permissions declared in `PluginContext.permissions[]` | ✅ |

**Verdict: ✅ PASS — Least privilege principle upheld. 3 permissions, all justified.**

---

# SEC-005 — Policy Validation

## Policy Execution Audit

| Policy | Engine | Priority | Tested | Outcome |
|---|---|---|---|---|
| `tender.policy.eligibility` | PolicyEngine | 1 | ✅ | Blocks ineligible companies |
| `tender.policy.compliance` | ConstraintEngine | 2 | ✅ | Blocks non-compliant bids |

## Evidence-to-Policy Chain (Lock 39)

All policies are executed **after** evidence collection and **before** any decision or artifact production:

```
Evidence → PolicyEngine.execute() → { allowed: true/false } → DecisionRecord → Artifact
```

**Verdict: ✅ PASS — Both policies enforce Lock 39 Evidence First chain correctly**
