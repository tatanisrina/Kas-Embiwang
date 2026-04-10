// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

// ============================================
// SUPABASE CONFIGURATION
// ============================================
const SUPABASE_URL = "https://qbdfiehsqhcfbdowrqch.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nBrGSfqtvoKFABa1YWASuA_Rpp_Nlac";

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase initialized successfully!');

// ============================================
// KAS API - Ledger Management
// ============================================
class KasAPI {
  /**
   * Add new Kas entry to database
   * @param {string} tanggal - Date (YYYY-MM-DD format)
   * @param {string} keterangan - Description
   * @param {string} jenis - 'masuk' or 'keluar'
   * @param {number} jumlah - Amount
   * @param {string} pembuat - Created by (username)
   * @param {array} absen - List of student numbers who paid
   */
  static async tambahKas(tanggal, keterangan, jenis, jumlah, pembuat, absen = []) {
    try {
      const { data, error } = await supabase
        .from('kas')
        .insert([
          {
            tanggal,
            keterangan,
            jenis_transaksi: jenis,
            jumlah: parseFloat(jumlah),
            dibuat_oleh: pembuat,
            absen: absen, // Store as array/JSON
            dibuat_tanggal: new Date().toISOString(),
            diubah_tanggal: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      console.log('✅ Kas entry added:', data[0]);
      return {
        success: true,
        message: 'Kas added successfully',
        data: data[0]
      };
    } catch (error) {
      console.error('❌ Error adding kas:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Get all Kas entries, optionally filtered by type
   * @param {string} jenis - Optional filter: 'masuk' or 'keluar'
   */
  static async getKas(jenis = '') {
    try {
      let query = supabase
        .from('kas')
        .select('*')
        .order('tanggal', { ascending: false });

      if (jenis) {
        query = query.eq('jenis_transaksi', jenis);
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log('✅ Kas data retrieved:', data?.length || 0, 'entries');
      return {
        success: true,
        message: 'Data retrieved successfully',
        data: data || []
      };
    } catch (error) {
      console.error('❌ Error fetching kas:', error);
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  /**
   * Get Kas entries for a specific week
   * @param {number} minggu - Week number
   */
  static async getKasByWeek(minggu) {
    try {
      // Note: You'll need to add minggu column to your kas table
      const { data, error } = await supabase
        .from('kas')
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) throw error;

      // Filter by week if minggu field exists
      const filtered = data.filter(item => {
        if (item.minggu === minggu) return true;
        // Fallback: calculate week from tanggal if minggu not available
        const date = new Date(item.tanggal);
        const week = getWeekNumber(date);
        return week === minggu;
      });

      return {
        success: true,
        message: 'Week data retrieved',
        data: filtered
      };
    } catch (error) {
      console.error('❌ Error fetching week data:', error);
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  /**
   * Update a Kas entry
   * @param {number} id - Record ID
   * @param {object} updates - Fields to update
   */
  static async updateKas(id, updates) {
    try {
      updates.diubah_tanggal = new Date().toISOString();

      const { data, error } = await supabase
        .from('kas')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;

      console.log('✅ Kas entry updated:', id);
      return {
        success: true,
        message: 'Kas updated successfully',
        data: data[0]
      };
    } catch (error) {
      console.error('❌ Error updating kas:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Delete a Kas entry
   * @param {number} id - Record ID
   */
  static async deleteKas(id) {
    try {
      const { error } = await supabase
        .from('kas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Kas entry deleted:', id);
      return {
        success: true,
        message: 'Kas deleted successfully'
      };
    } catch (error) {
      console.error('❌ Error deleting kas:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Subscribe to real-time updates
   * @param {function} callback - Function to call when data changes
   */
  static subscribeToKas(callback) {
    console.log('📡 Subscribing to real-time updates...');
    
    return supabase
      .channel('kas-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'kas' },
        (payload) => {
          console.log('📡 Real-time update received:', payload.eventType);
          callback(payload);
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });
  }
}

// ============================================
// PENGELUARAN API - Expenses Management
// ============================================
class PengeluaranAPI {
  /**
   * Add new Pengeluaran entry
   */
  static async tambahPengeluaran(tanggal, keterangan, kategori, jumlah, pembuat) {
    try {
      const { data, error } = await supabase
        .from('pengeluaran')
        .insert([
          {
            tanggal,
            keterangan,
            kategori,
            jumlah: parseFloat(jumlah),
            dibuat_oleh: pembuat,
            dibuat_tanggal: new Date().toISOString(),
            diubah_tanggal: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      console.log('✅ Pengeluaran entry added:', data[0]);
      return {
        success: true,
        message: 'Pengeluaran added successfully',
        data: data[0]
      };
    } catch (error) {
      console.error('❌ Error adding pengeluaran:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Get all Pengeluaran entries
   */
  static async getPengeluaran(kategori = '') {
    try {
      let query = supabase
        .from('pengeluaran')
        .select('*')
        .order('tanggal', { ascending: false });

      if (kategori) {
        query = query.eq('kategori', kategori);
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log('✅ Pengeluaran data retrieved:', data?.length || 0, 'entries');
      return {
        success: true,
        message: 'Data retrieved successfully',
        data: data || []
      };
    } catch (error) {
      console.error('❌ Error fetching pengeluaran:', error);
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  /**
   * Update Pengeluaran entry
   */
  static async updatePengeluaran(id, updates) {
    try {
      updates.diubah_tanggal = new Date().toISOString();

      const { data, error } = await supabase
        .from('pengeluaran')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;

      console.log('✅ Pengeluaran updated:', id);
      return {
        success: true,
        message: 'Pengeluaran updated successfully',
        data: data[0]
      };
    } catch (error) {
      console.error('❌ Error updating pengeluaran:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Delete Pengeluaran entry
   */
  static async deletePengeluaran(id) {
    try {
      const { error } = await supabase
        .from('pengeluaran')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Pengeluaran deleted:', id);
      return {
        success: true,
        message: 'Pengeluaran deleted successfully'
      };
    } catch (error) {
      console.error('❌ Error deleting pengeluaran:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get week number from date
 */
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Format currency to Rupiah
 */
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

// Export for use in HTML files
window.KasAPI = KasAPI;
window.PengeluaranAPI = PengeluaranAPI;
window.formatRupiah = formatRupiah;
window.getWeekNumber = getWeekNumber;
