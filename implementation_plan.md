# Goal: Implement 3-Layer Surprise, Polaroid Book, & Layout Adjustments

Berdasarkan permintaan terbaru Anda, saya telah merevisi rencana implementasi secara menyeluruh. Kita akan membuat *website* ini memiliki alur cerita yang jauh lebih dalam dan emosional di bagian akhir.

## Proposed Changes

### 1. Perbaikan Layout "Together Since"
#### [MODIFY] `src/components/Counter.jsx`
- Mengubah tata letak (*layout*) menjadi **satu kolom di tengah (Centered)**.
- "Together Since" akan diletakkan tepat di tengah layar dengan ukuran teks yang lebih proporsional dan elegan.
- "Next Birthday" akan diletakkan di bawahnya (atau kita bisa menyembunyikannya jika Anda hanya ingin fokus pada "Together Since", silakan beri tahu saya nanti).

### 2. Kejutan Berlapis (3 Layers of Surprise)
#### [MODIFY] `src/components/Surprise.jsx`
Alur "One Last Surprise" tidak akan langsung terbuka. Kita buat 3 tahapan interaksi:
- **Layer 1 (The Box):** Layar menampilkan Kotak Hadiah mewah. Saat diklik, kotak akan bergetar dan terbuka.
- **Layer 2 (The Envelope):** Dari dalam kotak muncul sebuah Amplop berstempel lilin. Saat diklik, amplop perlahan terbuka dan mengeluarkan **Buku Kenangan (Memory Book)**.
- **Layer 3 (The Grand Finale):** Setelah selesai membaca buku, buku akan memudar dan menghilang *(fade out)*, lalu layar akan menjadi gelap perlahan, diiringi ledakan *confetti*, dan muncul tulisan besar yang bersinar: *"Terimakasih telah hadir di dunia ini ❤️"* beserta beberapa ucapan cinta penutup.

### 3. Pembuatan "Polaroid Memory Book"
#### [NEW] `src/components/MemoryBook.jsx`
- Karena kenyamanan dan performa di HP sangat penting, kita akan menggunakan pendekatan **2D Flip Book (Halaman Buku Digital)** yang sangat mulus.
- **Isi Halaman:**
  - Tiap halaman akan memuat **4 Foto berdesain Polaroid** (bingkai putih, sedikit miring aestetik).
  - Di bawah atau di samping kolase Polaroid tersebut, akan ada ruang untuk **Tulisan/Pesan Romantis** dari Anda.
  - Terdapat total 23 foto di folder `public`, sehingga buku ini akan memiliki sekitar **6 Halaman** (tiap halaman 4 foto).
  - Terdapat tombol `Next Page` dan `Prev Page` yang elegan.
  - Di halaman terakhir, terdapat tombol `Tutup Buku`.

## User Review Required

> [!IMPORTANT]
> **Mohon konfirmasi dan tambahan informasi berikut sebelum saya memprogram kodenya:**
> 1. Apakah alur **3 Layer Surprise (Kotak -> Amplop -> Buku -> Ucapan Terakhir)** ini sudah persis seperti yang Anda bayangkan?
> 2. Untuk 6 halaman buku tersebut, **tulisan apa yang ingin Anda masukkan di masing-masing halaman?** (Atau haruskah saya buatkan kata-kata puitis berbahasa Indonesia/Inggris sementara yang nanti bisa Anda edit sendiri?)
> 3. Di bagian Counter, apakah "Next Birthday" tetap diletakkan di bawah "Together Since", atau dihapus saja agar layar fokus 100% di "Together Since"?

Saya siap mengeksekusi ini segera setelah Anda menyetujuinya!
