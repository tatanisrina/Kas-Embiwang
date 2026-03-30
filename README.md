<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kas Kelas Mingguan</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .tabs {
            display: flex;
            background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%);
            border-bottom: 3px solid #e0e7f1;
            padding: 5px 20px;
            gap: 10px;
        }

        .tab {
            flex: 1;
            padding: 18px 20px;
            text-align: center;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
            color: #666;
            border-radius: 8px 8px 0 0;
            margin-bottom: -5px;
        }

        .tab.active {
            background: white;
            color: #4facfe;
            border-bottom-color: #4facfe;
            box-shadow: 0 -3px 10px rgba(79, 172, 254, 0.1);
        }

        .tab:hover {
            background: rgba(79, 172, 254, 0.05);
            color: #4facfe;
        }

        .section {
            display: none;
            padding: 40px;
            min-height: 500px;
        }

        .section.active {
            display: block;
        }

        /* Section 1: Tambah Kas */
        .form-group {
            margin-bottom: 25px;
        }

        .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #333;
            font-size: 15px;
        }

        label .required {
            color: #e74c3c;
            margin-left: 2px;
        }

        input[type="checkbox"] {
            width: auto;
            margin-right: 10px;
            transform: scale(1.2);
        }

        input[type="number"], input[type="file"], select, input[type="text"], input[type="date"] {
            width: 100%;
            padding: 13px 16px;
            border: 2px solid #e0e7f1;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s;
            background-color: #fafbfc;
        }

        input[type="number"]:focus, input[type="file"]:focus, select:focus, input[type="text"]:focus, input[type="date"]:focus {
            outline: none;
            border-color: #4facfe;
            background-color: white;
            box-shadow: 0 0 0 4px rgba(79, 172, 254, 0.1);
        }

        .absen-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
            gap: 10px;
            max-height: 320px;
            overflow-y: auto;
            padding: 18px;
            background: linear-gradient(135deg, #f8f9fa 0%, #f0f3f7 100%);
            border-radius: 12px;
            border: 2px solid #e0e7f1;
        }

        .absen-item {
            display: flex;
            align-items: center;
            padding: 11px 12px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: all 0.2s;
            border: 2px solid transparent;
        }

        .absen-item:hover {
            box-shadow: 0 4px 12px rgba(79, 172, 254, 0.15);
            border-color: #4facfe;
        }

        .btn {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 16px 32px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(79, 172, 254, 0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        .qr-container {
            text-align: center;
            padding: 35px 30px;
            background: linear-gradient(135deg, #f8f9fa 0%, #f0f3f7 100%);
            border-radius: 15px;
            margin: 25px 0;
            border: 3px dashed #4facfe;
            box-shadow: 0 2px 10px rgba(79, 172, 254, 0.1);
        }

        .qr-code {
            width: 220px;
            height: 220px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #e8f4f8 0%, #f0f8fc 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #666;
            border: 2px solid #d0e8f2;
        }

        .qr-container p {
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        .form-section-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 30px 0 20px 0;
            padding-bottom: 12px;
            border-bottom: 3px solid #4facfe;
        }
        .checklist {
            background: white;
            border-radius: 12px;
            overflow: auto;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        .payment-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 800px;
        }

        .payment-table thead {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .payment-table th {
            padding: 12px 8px;
            text-align: center;
            font-weight: 600;
            border: 1px solid #0ea5e9;
            font-size: 11px;
            min-width: 35px;
        }

        .payment-table th.student-header {
            text-align: left;
            min-width: 120px;
            position: sticky;
            left: 0;
            z-index: 11;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .payment-table td {
            padding: 12px 8px;
            border: 1px solid #e9ecef;
            text-align: center;
            font-size: 12px;
            height: 40px;
        }

        .payment-table td.student-name-cell {
            font-weight: 600;
            color: #333;
            text-align: left;
            position: sticky;
            left: 0;
            background: #f8f9fa;
            z-index: 9;
            min-width: 120px;
        }

        .payment-table tbody tr:hover {
            background: #f0f8ff;
        }

        .payment-cell {
            cursor: pointer;
            transition: all 0.2s;
            border-radius: 4px;
            font-weight: 600;
            user-select: none;
        }

        .payment-cell.paid {
            background: #28a745;
            color: white;
        }

        .payment-cell.unpaid {
            background: #dc3545;
            color: white;
        }

        .payment-cell.no-data {
            background: #e9ecef;
            color: #999;
            cursor: default;
        }

        .payment-cell:hover.paid,
        .payment-cell:hover.unpaid {
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .stats-divider {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 4px solid #4facfe;
        }

        .stats-divider h3 {
            margin-bottom: 10px;
            color: #333;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }

        .modal-content {
            background-color: white;
            margin: 15% auto;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 20px;
            margin: -30px -30px 20px -30px;
            border-radius: 15px 15px 0 0;
            font-size: 1.3em;
            font-weight: 600;
        }

        .modal-body {
            margin: 20px 0;
            font-size: 16px;
            color: #333;
        }

        .modal-body p {
            margin: 12px 0;
            line-height: 1.6;
        }

        .modal-label {
            font-weight: 600;
            color: #4facfe;
        }

        .close-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            width: 100%;
            margin-top: 15px;
        }

        .close-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .status-unpaid {
            background: #fff3cd;
            color: #856404;
        }

        .status-paid {
            background: #d4edda;
            color: #155724;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
        }

        .stat-number {
            font-size: 2.8em;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .form-section-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 30px 0 20px 0;
            padding-bottom: 12px;
            border-bottom: 3px solid #4facfe;
        }

        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .absen-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Kas Kelas Mingguan</h1>
            <p>Sistem pencatatan iuran kelas yang mudah dan praktis</p>
            <div style="margin-top: 15px;">
                <a href="admin.html" style="background: rgba(255,255,255,0.2); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; transition: all 0.3s; border: 2px solid rgba(255,255,255,0.3);" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">👨‍💼 Admin Panel</a>
            </div>
        </div>

        <div class="tabs">
            <div class="tab active" onclick="switchTab('tambah')">📝 Tambah Kas</div>
            <div class="tab" onclick="switchTab('checklist')">✅ Checklist Bayar</div>
        </div>

        <!-- Section 1: Tambah Kas -->
        <div id="tambah" class="section active">
            <h2 style="margin-bottom: 30px; color: #333; font-size: 2em;">Tambah Data Kas Mingguan</h2>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Minggu Ke-</label>
                    <input type="number" id="minggu" min="1" max="52" value="1">
                </div>
                <div class="form-group">
                    <label>Jumlah Iuran</label>
                    <input type="number" id="jumlah" min="0" value="5000">
                </div>
                <div class="form-group">
                    <label>Tanggal</label>
                    <input type="date" id="tanggal">
                </div>
            </div>

            <div class="form-group">
                <label>Absen Siswa (pilih yang hadir)</label>
                <div class="absen-grid" id="absenGrid">
                    <!-- Absen 1-30 akan di-generate via JS -->
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Bukti Pembayaran <span class="required">*</span></label>
                    <input type="file" id="bukti" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label>Keterangan</label>
                    <input type="text" id="keterangan" placeholder="Catatan tambahan...">
                </div>
            </div>

            <div class="qr-container">
                <img src="D:/Downloads/Qris.jpeg" alt="QRIS Code" style="max-width: 220px; height: auto; border-radius: 10px; margin: 0 auto 20px; display: block;">
                <p>Scan QR Code di atas atau transfer ke:<br>
                <strong>BNI 1855875609<br>
                a/n Tata Nisrina Firdausi</strong></p>
            </div>

            <button class="btn" onclick="simpanData()">💾 Simpan Data Kas</button>
        </div>

        <!-- Section 2: Checklist -->
        <div id="checklist" class="section">
            <h2 style="margin-bottom: 30px; color: #333; font-size: 2em;">📊 Checklist Pembayaran Tahunan (52 Minggu)</h2>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number" id="totalSiswa">30</div>
                    <div>Total Siswa</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="totalBayar">0</div>
                    <div>Total Pembayaran</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="totalJumlah">Rp 0</div>
                    <div>Total Iuran (Tahunan)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="persentaseBayar">0%</div>
                    <div>Persentase Pembayaran</div>
                </div>
            </div>

            <div class="checklist" id="checklistContainer">
                <table class="payment-table">
                    <thead>
                        <tr>
                            <th class="student-header">Siswa</th>
                        </tr>
                    </thead>
                    <tbody id="paymentTableBody">
                        <!-- Student rows akan di-generate via JS -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Payment Detail Modal -->
    <div id="paymentModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                📋 Detail Pembayaran
            </div>
            <div class="modal-body">
                <p><span class="modal-label">Siswa:</span> <span id="modalSiswa">-</span></p>
                <p><span class="modal-label">Minggu:</span> <span id="modalMinggu">-</span></p>
                <p><span class="modal-label">Tanggal Pembayaran:</span> <span id="modalTanggal">-</span></p>
                <p><span class="modal-label">Jumlah Iuran:</span> <span id="modalJumlah">-</span></p>
                <p><span class="modal-label">Keterangan:</span> <span id="modalKeterangan">-</span></p>
            </div>
            <button class="close-btn" onclick="closeModal()">← Tutup</button>
        </div>
    </div>

    <script>
        let dataKas = JSON.parse(localStorage.getItem('dataKas')) || [];
        let siswaData = [];

        // Daftar Siswa
        const studentNames = [
            'Adenia Djayantie Citra Deajora',
            'Adila Saqiba',
            'Afif Fairuuz Zaidan',
            'Alisa',
            'Anandito Reksa Syabil',
            'Arin Sukma Ayu',
            'Arsya Ubaidillah',
            'Arwa Yumna Inayah',
            'Aura Anbia Definahede',
            'Christina Natania',
            'Dara Nawa Azalia',
            'Echa Putrimulyana',
            'Faiz Zufat Chanda Kayana',
            'Febiola Nainasika',
            'Hafidzh Dwi Arya Widiyatna',
            'Katarina Isabel Taniasari',
            'Lunar Shaquila Az Zahra',
            'M Hylmi Keyza Wahyudi',
            'Maydita Dwi Susilowati',
            'Muhammad Faqih Hatta Perdana',
            'Nabila Clara Sukma',
            'Naura Ash Shafaa\'',
            'Novia Putri Anggraini',
            'Nurain',
            'Nurhasanah Rambe',
            'Safira Anindita',
            'Tata Nisrina Firdausi',
            'Yasmin Az Zahra',
            'Yuni Setyawati Sumarno',
            'Zaki Mulia Widyatama'
        ];

        // Generate absen 1-30
        function generateAbsen() {
            const grid = document.getElementById('absenGrid');
            grid.innerHTML = '';
            for (let i = 1; i <= 30; i++) {
                const div = document.createElement('div');
                div.className = 'absen-item';
                div.innerHTML = `
                    <input type="checkbox" id="absen${i}" value="${i}">
                    <label for="absen${i}">${studentNames[i-1]}</label>
                `;
                grid.appendChild(div);
            }
        }

        function switchTab(tabName) {
            // Switch tabs
            document.querySelectorAll('.tab').forEach(tab => {
                if (tab.textContent.includes(tabName === 'tambah' ? 'Tambah' : 'Checklist')) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            
            if (tabName === 'checklist') {
                renderChecklist();
            }
        }

        function simpanData() {
            const minggu = document.getElementById('minggu').value;
            const jumlah = parseInt(document.getElementById('jumlah').value);
            const tanggal = document.getElementById('tanggal').value || new Date().toISOString().split('T')[0];
            const keterangan = document.getElementById('keterangan').value;
            const bukti = document.getElementById('bukti').files[0];
            
            // Ambil data absen
            const absen = [];
            for (let i = 1; i <= 30; i++) {
                const checkbox = document.getElementById(`absen${i}`);
                if (checkbox.checked) {
                    absen.push(i);
                }
            }

            if (absen.length === 0) {
                alert('⚠️ Pilih minimal 1 siswa yang hadir!');
                return;
            }

            if (!bukti) {
                alert('⚠️ Bukti pembayaran harus diisi!');
                return;
            }

            const newData = {
                id: Date.now(),
                minggu: parseInt(minggu),
                jumlah: jumlah,
                tanggal: tanggal,
                absen: absen,
                keterangan: keterangan,
                bukti: bukti ? URL.createObjectURL(bukti) : null,
                createdAt: new Date().toLocaleDateString('id-ID')
            };

            dataKas.push(newData);
            localStorage.setItem('dataKas', JSON.stringify(dataKas));
            
            alert('✅ Data kas berhasil disimpan!\n\nSiswa yang hadir minggu ' + minggu + ' otomatis ditandai sebagai sudah bayar.');
            resetForm();
        }

        function resetForm() {
            document.getElementById('minggu').value = 1;
            document.getElementById('jumlah').value = 5000;
            document.getElementById('tanggal').value = '';
            document.getElementById('keterangan').value = '';
            document.getElementById('bukti').value = '';
            generateAbsen(); // Reset checkboxes
        }

        function renderChecklist() {
            const table = document.querySelector('.payment-table');
            const thead = table.querySelector('thead tr');
            const tbody = document.getElementById('paymentTableBody');
            
            // Clear existing headers (except first one)
            while (thead.children.length > 1) {
                thead.removeChild(thead.lastChild);
            }
            
            // Generate week headers (W1-W52)
            for (let week = 1; week <= 52; week++) {
                const th = document.createElement('th');
                th.textContent = `W${week}`;
                th.style.minWidth = '35px';
                thead.appendChild(th);
            }
            
            let tbody_html = '';
            let totalPayments = 0;
            let totalLuran = 0;
            
            // Create a map of payments from dataKas
            // Structure: {siswa: {week: {data}}}
            const paymentMap = {};
            for (let i = 1; i <= 30; i++) {
                paymentMap[i] = {};
            }
            
            // Populate paymentMap from dataKas
            dataKas.forEach(data => {
                data.absen.forEach(siswa => {
                    paymentMap[siswa][data.minggu] = {
                        minggu: data.minggu,
                        tanggal: data.tanggal,
                        jumlah: data.jumlah,
                        keterangan: data.keterangan,
                        createdAt: data.createdAt
                    };
                    totalPayments++;
                    totalLuran += data.jumlah;
                });
            });
            
            // Generate rows for each student
            for (let siswa = 1; siswa <= 30; siswa++) {
                let row_html = `<tr><td class="student-name-cell">${studentNames[siswa-1]}</td>`;
                
                // Generate cells for each week
                for (let week = 1; week <= 52; week++) {
                    const paid = paymentMap[siswa][week];
                    const cellClass = paid ? 'payment-cell paid' : 'payment-cell unpaid';
                    const cellText = paid ? '✓' : '-';
                    
                    if (paid) {
                        row_html += `<td class="${cellClass}" onclick="showPaymentDetail(${siswa}, ${week})" title="Klik untuk lihat detail pembayaran">${cellText}</td>`;
                    } else {
                        row_html += `<td class="${cellClass}" title="Belum ada pembayaran">${cellText}</td>`;
                    }
                }
                
                row_html += '</tr>';
                tbody_html += row_html;
            }
            
            tbody.innerHTML = tbody_html;
            
            // Update statistics
            const totalSlots = 30 * 52;
            const percentage = totalPayments > 0 ? Math.round((totalPayments / totalSlots) * 100) : 0;
            
            document.getElementById('totalBayar').textContent = totalPayments;
            document.getElementById('totalJumlah').textContent = formatRupiah(totalLuran);
            document.getElementById('persentaseBayar').textContent = percentage + '%';
        }

        function showPaymentDetail(siswa, week) {
            // Find the payment data from dataKas
            let paymentData = null;
            
            dataKas.forEach(data => {
                if (data.minggu === week && data.absen.includes(siswa)) {
                    paymentData = data;
                }
            });
            
            if (paymentData) {
                document.getElementById('modalSiswa').textContent = studentNames[siswa-1];
                document.getElementById('modalMinggu').textContent = 'Minggu ' + week;
                document.getElementById('modalTanggal').textContent = paymentData.tanggal;
                document.getElementById('modalJumlah').textContent = formatRupiah(paymentData.jumlah);
                document.getElementById('modalKeterangan').textContent = paymentData.keterangan || '-';
                
                document.getElementById('paymentModal').style.display = 'block';
            }
        }

        function closeModal() {
            document.getElementById('paymentModal').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('paymentModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        function formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(angka);
        }

        // Initialize
        document.getElementById('tanggal').value = new Date().toISOString().split('T')[0];
        generateAbsen();
        renderChecklist();
    </script>
</body>
</html>

