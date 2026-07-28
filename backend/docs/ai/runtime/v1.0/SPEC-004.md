# SPEC-004: Agent Lifecycle & Capability Session

## 1. Agent Runtime Hierarchy
```
Knowledge Access Layer
↓
Agent Runtime
↓
Runtime Scheduler
↓
Capability Sessions
↓
Service Mesh
↓
AI Core Kernel
```

## 2. Parent-Child Spawn Protocol
Mekanisme percabangan kognitif diikat melalui perintah asinkron:
- `Spawn()`: Melahirkan PID baru.
- `Join()`: Mengunci status ke `WAITING` hingga PID anak mereturn status `COMPLETED`.
- `Detach()`: Lepas kendali PID anak (bergerak liar otonom).
- `Terminate()`: Menghanguskan PID anak beserta seluruh *Sub-Tree*.
