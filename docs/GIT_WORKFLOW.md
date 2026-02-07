# Quy trình Git (Git Workflow)

## 1. Branching Strategy
Sử dụng mô hình đơn giản hóa dựa trên Git Flow:

- **main**: Nhánh chính, chứa code production-ready.
- **develop**: (Tuỳ chọn) Nhánh phát triển chung.
- **feature/tên-tính-năng**: Nhánh phát triển tính năng mới. Ví dụ: `feature/cart-checkout`, `feature/product-filter`.
- **fix/tên-bug**: Nhánh sửa lỗi. Ví dụ: `fix/login-error`.
- **hotfix/**: Sửa lỗi khẩn cấp trên production.

## 2. Commit Message Convention
Tuân theo chuẩn **Conventional Commits**:
`type(scope): subject`

Các loại `type` phổ biến:
- **feat**: Tính năng mới (new feature).
- **fix**: Sửa lỗi (bug fix).
- **docs**: Thay đổi tài liệu (documentation).
- **style**: Format code, không đổi logic (formatting, missing semi colons, etc).
- **refactor**: Tái cấu trúc code (không thêm tính năng, không sửa lỗi).
- **chore**: Các việc vặt (update dependency, config build...).

**Ví dụ:**
- `feat(cart): thêm chức năng thêm sản phẩm vào giỏ`
- `fix(auth): sửa lỗi không lưu token khi đăng nhập`
- `docs: cập nhật hướng dẫn cài đặt`
- `style: format code components`

## 3. Pull Request (PR)
- Tạo PR từ nhánh `feature` vào nhánh chính (`main` hoặc `develop`).
- PR cần mô tả rõ những thay đổi đã thực hiện.
- Review code trước khi merge.
