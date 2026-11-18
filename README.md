# BẢN DEMO PHƯƠNG PHÁP LUẬN LẬP TRÌNH MÃ NGUỒN MỞ (OSS METHODOLOGY DEMO)

## 📌 1. Giới thiệu Tổng quan
Ứng dụng web tương tác (**Interactive Web Application**) này được xây dựng nhằm mô phỏng, trực quan hóa và đào tạo toàn diện về **Phương pháp luận Phát triển Phần mềm Mã nguồn mở (Open Source Software Development Methodology)**.

Sản phẩm được đóng gói bằng công nghệ **HTML5 / CSS3 / JavaScript (Vanilla Modern)** hoàn toàn chạy được ngay trên bất kỳ trình duyệt hiện đại nào mà không phụ thuộc vào bất kỳ thư viện hay framework bên ngoài cồng kềnh.

---

## 🚀 2. Cách Khởi chạy Demo

### Cách 1: Mở trực tiếp bằng Trình duyệt
- Nhấp đúp chuột vào file `index.html` trong thư mục `oss-methodology-demo` trên File Explorer của Windows.
- Hoặc mở trình duyệt (Chrome / Edge / Firefox) và kéo thả file `index.html` vào cửa sổ trình duyệt.

### Cách 2: Khởi chạy qua Local Web Server
Nếu bạn muốn chạy dạng server HTTP:
```powershell
# Chuyển vào thư mục demo
cd e:\vscoder\VHBTPM_DevOps_2026\oss-methodology-demo

# Khởi chạy bằng Python (nếu có)
python -m http.server 8080

# Hoặc dùng npx serve (Node.js)
npx serve .
```
Sau đó truy cập địa chỉ: `http://localhost:8080`

---

## 🎯 3. Các Phân hệ Tương tác (Interactive Modules)

Ứng dụng được chia thành 6 khu vực chức năng chính:

### 1. 🔄 Chu trình Đóng góp 7 bước (Contribution Lifecycle Simulator)
Mô phỏng trải nghiệm thực tế của một Contributor với 7 giai đoạn chuẩn quốc tế:
1. **Discovery & Issue Triage**: Tìm kiếm `Good First Issue`, quy tắc ứng xử (`CODE_OF_CONDUCT.md`), hướng dẫn (`CONTRIBUTING.md`).
2. **Forking Workflow**: Fork repo từ `upstream`, clone về local, thiết lập cấu hình remotes (`origin` & `upstream`).
3. **Branching & Code Standards**: Tạo nhánh tính năng cô lập (`feat/...`), ký cam kết bản quyền mã nguồn DCO (`git commit -s`), tuân thủ chuẩn Conventional Commits.
4. **Quality Gates & Local CI**: Chạy Jest Unit Tests, kiểm tra độ phủ mã nguồn (Coverage > 90%), Pre-commit linter.
5. **Pull Request & GitHub Actions**: Mở PR với template chuẩn, liên kết từ khóa đóng issue (`Closes #42`), kích hoạt CI Matrix.
6. **Peer Code Review & Iteration**: Nhận phản hồi từ Maintainer, bổ sung test case, giải quyết thay đổi được yêu cầu.
7. **Merge, Release & SemVer**: Maintainer thực hiện Squash & Merge, kích hoạt Semantic Release tự động sinh version mới và ghi nhận công lao người đóng góp.
*Kèm theo Terminal giả lập tương tác hỗ trợ gõ và chạy lệnh real-time.*

### 2. 🌿 Sơ đồ Git Topology Trực quan (Git Visualizer)
- Sử dụng SVG động để trực quan hóa kiến trúc phân tán (Distributed VCS):
  - **Upstream (Main branch)**: Nhánh được bảo vệ của tổ chức.
  - **Origin / Fork (Main branch)**: Bản sao trên tài khoản cá nhân.
  - **Local (Feature branch)**: Nhánh làm việc cục bộ.
- Cho phép người dùng bấm các nút hành động: *Fork -> Checkout Branch -> Commit -> Open PR -> Squash & Merge* và theo dõi các node commit chuyển động trên đồ thị.

### 3. 🕵️ Phòng Xét duyệt PR (PR Review Lab - Mini Game)
- Người dùng đóng vai **Maintainer** thẩm định một Pull Request thực tế (`feat(user): search user`).
- Giao diện Diff Viewer hiển thị mã thay đổi.
- Thử thách: Phát hiện lỗ hổng bảo mật nghiêm trọng **SQL Injection** tại dòng 12 (ghép chuỗi query không an toàn).
- Thử nghiệm các quyết định: Để lại nhận xét (Comment), Yêu cầu sửa đổi (Request Changes) hoặc Phê duyệt sai lầm (Approve), kèm hệ thống phân tích hậu quả tự động.

### 4. ⚖️ Cây Quyết định Giấy phép Bản quyền (Open Source Licenses Matrix)
- Giúp người làm dự án lựa chọn chính xác giấy phép:
  - **MIT License**: Giấy phép Permissive phổ biến nhất, cho phép thương mại hóa và mã đóng.
  - **Apache 2.0**: Bổ sung điều khoản cấp quyền sở hữu trí tuệ / bằng sáng chế (Patent Grant) và cấm dùng thương hiệu.
  - **GPLv3**: Giấy phép Copyleft mạnh mẽ, bắt buộc các sản phẩm phái sinh phải luôn mở mã.
  - **AGPLv3 (Affero GPL)**: Bịt lỗ hổng SaaS/Cloud hosting, chống các nhà cung cấp đám mây đóng gói dịch vụ mà không mở mã.
- Tự động hiển thị thẻ Permissions (Quyền hạn), Conditions (Điều kiện) và Limitations (Giới hạn).

### 5. 🏷️ Máy tính SemVer & Conventional Commits
- Form cấu hình tương tác: Chọn Commit Type (`feat`, `fix`, `perf`, `refactor`), Scope, Mô tả và cờ `BREAKING CHANGE`.
- Xem chuỗi commit chuẩn sinh ra theo format Angular/Conventional.
- Tự động phân tích quy tắc nhảy version:
  - `BREAKING CHANGE` -> Tăng **MAJOR** (+1.0.0)
  - `feat` -> Tăng **MINOR** (+0.1.0)
  - `fix / perf` -> Tăng **PATCH** (+0.0.1)

### 6. 🏛️ Triết lý & Mô hình Quản trị (Philosophy & Governance)
- Phân tích sự đối lập giữa hai triết lý: **Nhà thờ (The Cathedral)** và **Chợ trời (The Bazaar)**.
- Định luật Linus: *"Given enough eyeballs, all bugs are shallow"*.
- Các mô hình tổ chức quyền lực: BDFL, Meritocracy, Do-ocracy, và Foundations (CNCF, Linux Foundation).
- Bậc thang vai trò cộng đồng: User -> Contributor -> Maintainer/Committer -> Owner/TSC.

---

## 📂 4. Cấu trúc Thư mục

```
oss-methodology-demo/
│
├── index.html        # Trang giao diện chính (HTML5 Semantic)
├── README.md         # Tài liệu thuyết minh & hướng dẫn vận hành
├── css/
│   └── style.css     # Định kiểu phong cách GitHub Dark Theme & Glassmorphism
└── js/
    └── app.js        # Logic mô phỏng tương tác, SVG renderer, state management
```

---

## 💡 5. Đóng góp & Bản quyền
Dự án được xây dựng phục vụ nghiên cứu & thực hành môn học **Vận hành & Phát triển Phần mềm (DevOps)**.
- Giấy phép đề xuất: **MIT License**.
