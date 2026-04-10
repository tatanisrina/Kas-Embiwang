/**
 * Kas Kelas API Helper
 * Simplifies calls to the backend API
 */

// Set your API URL here (change to your domain when deployed)
const API_BASE_URL = 'http://localhost/kas-embiwang';

class KasAPI {
    /**
     * Add new Kas entry
     */
    static async tambahKas(tanggal, keterangan, jenis, jumlah, pembuat) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_kas.php?action=tambah_kas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tanggal,
                    keterangan,
                    jenis_transaksi: jenis,
                    jumlah: parseFloat(jumlah),
                    dibuat_oleh: pembuat
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Get all Kas entries
     */
    static async getKas(jenis = '', limit = 100, offset = 0) {
        try {
            let url = `${API_BASE_URL}/api_kas.php?action=get_kas&limit=${limit}&offset=${offset}`;
            if (jenis) {
                url += `&jenis=${jenis}`;
            }
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Get Kas entry by ID
     */
    static async getKasById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_kas.php?action=get_kas_by_id&id=${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Update Kas entry
     */
    static async updateKas(id, updates) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_kas.php?action=update_kas`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, ...updates })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Delete Kas entry
     */
    static async deleteKas(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_kas.php?action=delete_kas`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Get current balance
     */
    static async getSaldo() {
        try {
            const response = await fetch(`${API_BASE_URL}/api_kas.php?action=get_saldo`);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Get monthly report
     */
    static async getLaporan(bulan, tahun) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_kas.php?action=get_laporan&bulan=${bulan}&tahun=${tahun}`);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }
}

class PengeluaranAPI {
    /**
     * Add new expense
     */
    static async tambah(tanggal, deskripsi, jumlah, kategori, pembuat) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_pengeluaran.php?action=tambah`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tanggal,
                    deskripsi,
                    jumlah: parseFloat(jumlah),
                    kategori,
                    dibuat_oleh: pembuat
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Get all expenses
     */
    static async get(limit = 100, offset = 0) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_pengeluaran.php?action=get&limit=${limit}&offset=${offset}`);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Update expense
     */
    static async update(id, updates) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_pengeluaran.php?action=update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, ...updates })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Delete expense
     */
    static async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api_pengeluaran.php?action=delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message };
        }
    }
}

// Example usage:
/*
// Add Kas
const result = await KasAPI.tambahKas('2024-01-15', 'Iuran siswa', 'masuk', 100000, 'Admin Nama');

// Get balance
const saldo = await KasAPI.getSaldo();

// Get all entries
const entries = await KasAPI.getKas();

// Get only income
const income = await KasAPI.getKas('masuk');
*/
