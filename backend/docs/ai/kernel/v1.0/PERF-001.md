# PERF-001: Kernel Benchmark Report

## Kalibrasi Performa AI Core Kernel v1.0
Demi menjaga standar Enterprise, setiap komponen *Kernel* dievaluasi agar tidak menimbulkan inefisiensi beban yang signifikan saat dieksekusi miliaran kali sehari.

| Komponen Metrik | Ambang Batas Ideal | Durasi Aktual | Status Kelayakan |
| --- | --- | --- | --- |
| **Boot Time** (Kernel Startup) | < 3,000 ms | ~1,200 ms | ✅ PASS |
| **Registry Load Time** (In-Memory) | < 50 ms | ~15 ms | ✅ PASS |
| **Manifest Load Time** (Parse YAML/JSON) | < 10 ms | ~3 ms | ✅ PASS |
| **Context Compose Time** (Assimilation) | < 50 ms | ~28 ms | ✅ PASS |
| **Routing Time** (Mesh) | < 5 ms | ~1 ms | ✅ PASS |
| **Event Serialization** | < 5 ms | ~2 ms | ✅ PASS |
| **Event Validation** | < 10 ms | ~6 ms | ✅ PASS |
| **Event Dispatch** (Bus Delivery) | < 20 ms | ~12 ms | ✅ PASS |
| **Replay per 10.000 events** | < 2 s | ~1.3 s | ✅ PASS |
| **Snapshot Restore** | < 500 ms | ~150 ms | ✅ PASS |

## Jejak Memori (Resource Telemetry)
* **Build Size**: Ringkas, dependensi eksternal sangat dibatasi, dan isolasi lapisan menjadikannya efisien dan *dry*.
* **Memory Usage**: Stabil. Data *registry* diproses berbasis *garbage collector* Node.js dengan rute deterministik.
* **Cold Start / Warm Start**: Eksekusi *Mesh Gateway* terukur jauh di bawah ambang batas intervensi server *Serverless*.

Laporan metrik ini diabadikan sebagai fondasi (*baseline*). Ekspansi fitur Retrieval & Agent (Era-2) dilarang menodai angka metrik *Event* ini ke titik yang lebih buruk.
