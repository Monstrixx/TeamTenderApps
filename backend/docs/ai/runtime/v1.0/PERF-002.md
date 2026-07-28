# PERF-002: Retrieval Platform KPI Metrics

## Target Parameter Eksekusi (Definition of Done AI-06)
Tolak ukur ketersediaan lapisan akses ilmu (*Knowledge Access Layer*) dibingkai secara empiris dengan KPI:

| Metrik Operasional | Target Eksekutif | Keterangan |
| --- | --- | --- |
| **Retrieval Precision** | `≥ 95%` | Kualitas kecocokan hasil teratas. |
| **Recall** | `≥ 95%` | Keutuhan pencarian yang tak terlewat via ekpansi istilah. |
| **Context Accuracy** | `≥ 95%` | Kebenaran rangkaian konteks yang dihasilkan. |
| **Evidence Accuracy** | `≥ 98%` | Keandalan referensi/bukti yang lolos filter *Scoring*. |
| **Source Attribution** | `100%` | Murni nol kompromi. Seluruh entitas fakta mutlak punya rujukan. |
| **Policy Compliance** | `100%` | Kepatuhan mutlak privasi lintas-workspace (tanpa data lolos saring). |
| **Average Latency** | `< 200 ms` | Kecepatan respons MVP tanpa pengerahan *Generative LLM* penuh. |
| **Cache Hit Ratio** | `TBD` | Meningkat seiring deduplikasi *Fingerprint*. |
