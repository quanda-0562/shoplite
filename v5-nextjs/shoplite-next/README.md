# ShopLite Next.js

Ứng dụng cửa hàng trực tuyến mẫu dùng Next.js App Router và dữ liệu sản phẩm từ DummyJSON. Có thể tìm kiếm, lọc sản phẩm, quản lý giỏ hàng và thử quy trình đặt hàng.

## Tính năng

- Danh sách sản phẩm render trên server, tìm kiếm theo tên, lọc danh mục và phân trang.
- Trang chi tiết có metadata riêng qua `generateMetadata`; ảnh sản phẩm dùng `next/image` và font Geist dùng `next/font/local`.
- Giỏ hàng lưu trên trình duyệt bằng Zustand.
- Đăng nhập tài khoản DummyJSON qua NextAuth; form đặt hàng kiểm tra dữ liệu bằng React Hook Form và Zod.
- Xem tối đa 10 đơn hàng thử nghiệm lưu trong cookie của trình duyệt.

## Công nghệ

Next.js 16, React 19, TypeScript, Tailwind CSS 4, NextAuth, Zustand, React Hook Form, Zod và DummyJSON API.

## Chạy local

Yêu cầu Node.js 20.9 trở lên và kết nối tới `dummyjson.com`.

```bash
cd v5-nextjs/shoplite-next
npm ci
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Tài khoản mẫu: `emilys` / `emilyspass`. Để chạy bản production:

```bash
npm run build
npm start
```

Khi triển khai, đặt `NEXTAUTH_URL`, `NEXTAUTH_SECRET`; có thể đặt thêm `NEXT_PUBLIC_SITE_URL` để tạo canonical URL (Vercel tự cung cấp `VERCEL_PROJECT_PRODUCTION_URL`). Đây là ứng dụng demo: đơn hàng lưu trong cookie, không có thanh toán thật hay cơ sở dữ liệu.

## Demo Vercel

Chưa tìm thấy URL triển khai đã xác minh trong repo. Cần cập nhật đường dẫn tại đây sau khi có URL Vercel.

Xem thêm [README ở thư mục gốc](../../README.md) để biết các phiên bản khác của ShopLite.
