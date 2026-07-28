# PERF-003: Scheduler & Telemetry Baseline

## Runtime Constraints
- **Max Planning Time**: `1000 ms`
- **Max Agent Queue Size**: `500 Process` per instance
- **Max Observation Wait Time**: `5000 ms`

## Tracking Metrics
Telemetri tidak hanya mencatat `success/error`, tetapi:
1. `Queue Wait Time`
2. `Mailbox Size`
3. `Message Throughput`
4. `Child Agent Count` (Spawn/Join)
5. `Memory Usage` (Artifact Size Thresholds)
6. `Scheduler Utilization` (CPU wait/idle)
