DROP SCHEMA IF EXISTS covid CASCADE;
CREATE SCHEMA covid;

-- Tạo bảng : ThongTinCaNhan
DROP TABLE IF EXISTS covid.ThongTinCaNhan;
CREATE TABLE covid.ThongTinCaNhan
(
  ID SERIAL
, NgayKhaiBao VARCHAR(500) DEFAULT NOW()
, CongTy VARCHAR(500)
, PhongBan VARCHAR(500)
, TenLanhDao VARCHAR(500)
, EmailLanhDao VARCHAR(500)
, MaNV VARCHAR(500)
, TenNV VARCHAR(500)
, ChucDanh VARCHAR(500)
, SDT VARCHAR(500)
, Email VARCHAR(500)
, DiaChiLamViec VARCHAR(500)
, DiaChiLamViecHienTai VARCHAR(500)
, DiaChiCuTru VARCHAR(500)
, DiaDiemThuongDi VARCHAR(1000)
, NguyenQuan VARCHAR(500)
);

-- Tạo bảng : NhanVien
DROP TABLE IF EXISTS covid.NhanVien;
CREATE TABLE covid.NhanVien
(
  ID SERIAL
, MaNV VARCHAR(500)
, HoTen VARCHAR(500)
, PhongBan VARCHAR(500)
, SDT VARCHAR(500)
, Email VARCHAR(500)
, ChucDanh VARCHAR(500)
, CongTy VARCHAR(500)
, TenLanhDao VARCHAR(500)
, EmailLanhDao VARCHAR(500)
);

-- Tạo bảng : KhaiBao
DROP TABLE IF EXISTS covid.KhaiBao;
CREATE TABLE covid.KhaiBao
(
  ID SERIAL
, LoaiDoiTuong VARCHAR(500)
, HoTen VARCHAR(500)
, Email VARCHAR(500)
, MaNV VARCHAR(500)
, NgayKhaiBao VARCHAR(500) DEFAULT NOW()
, LoaiKhaiBao VARCHAR(500)
);

-- Tạo bảng : LichTrinhDuKien
DROP TABLE IF EXISTS covid.LichTrinhDuKien;
CREATE TABLE covid.LichTrinhDuKien
(
  ID SERIAL
, KhaiBaoID INTEGER
, ThoiGian VARCHAR(500)
, PhuongTien VARCHAR(500)
, DiaDiem VARCHAR(500)
, LyDo VARCHAR(500)
);

-- Tạo bảng : PhuongTien
DROP TABLE IF EXISTS covid.PhuongTien;
CREATE TABLE covid.PhuongTien
(
  ID SERIAL
, KhaiBaoID INTEGER
, ThoiGian VARCHAR(500)
, Loai VARCHAR(500)
, SoHieu VARCHAR(500)
, LyDo VARCHAR(500)
, PhanLoaiPhuongTien VARCHAR(500)
);

-- Tạo bảng : DiaDiem
DROP TABLE IF EXISTS covid.DiaDiem;
CREATE TABLE covid.DiaDiem
(
  ID SERIAL
, KhaiBaoID INTEGER
, ThoiGian VARCHAR(500)
, TenDiaDiem VARCHAR(500)
, TinhTrangDiaDiem VARCHAR(500)
, DiaDiemLamViec VARCHAR(500)
, PhanLoaiDiaDiem VARCHAR(500)
);

-- Tạo bảng : TinhTrangSucKhoe
DROP TABLE IF EXISTS covid.TinhTrangSucKhoe;
CREATE TABLE covid.TinhTrangSucKhoe
(
  ID SERIAL
, KhaiBaoID INTEGER
, TinhTrang VARCHAR(500)
);

-- Tạo bảng : TinhTrangXetNghiem
DROP TABLE IF EXISTS covid.TinhTrangXetNghiem;
CREATE TABLE covid.TinhTrangXetNghiem
(
  ID SERIAL
, KhaiBaoID INTEGER
, MucXetNghiem VARCHAR(500)
, KetQua VARCHAR(500)
);
