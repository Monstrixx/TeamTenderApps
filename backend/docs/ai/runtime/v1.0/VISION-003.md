# VISION-003: Distributed Intelligence (Agent Runtime)

## The Process Manager Paradigm
Di Era-2, Agent bukanlah entitas abstrak yang menghilang setelah melahirkan deret huruf. Agent adalah proses yang dihidupkan (spawned), berkolaborasi, dievaluasi, dan diawasi oleh penjaga gerbang.

Kita tidak membangun bot percakapan. Kita membangun **Distributed Process Manager for Cognitive Workloads**. 

Setiap langkah kognitif terfragmentasi menjadi objek taktis. Saat seorang *Executive Agent* menghadapi sebuah masalah besar, ia berhak memecah masalah dan memanggil (spawn) *Planner Agent* hingga *Research Agent* secara paralel. Semuanya bertegur sapa lewat sistem *Mailbox*, bukan lewat pemanggilan metode linear.
