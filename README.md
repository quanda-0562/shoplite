# ShopLite

ShopLite là dự án cửa hàng trực tuyến mẫu. Bản Next.js tại [`v5-nextjs/shoplite-next`](v5-nextjs/shoplite-next) hiển thị dữ liệu sản phẩm từ DummyJSON, hỗ trợ tìm kiếm, giỏ hàng và quy trình đặt hàng thử nghiệm.

## Tính năng

- Danh sách sản phẩm render trên server, tìm kiếm theo tên, lọc danh mục và phân trang.
- Trang chi tiết sản phẩm có title và description riêng qua `generateMetadata`.
- Ảnh sản phẩm tối ưu bằng `next/image`; font Geist được lưu trong dự án và tải qua `next/font/local`.
- Giỏ hàng lưu trong trình duyệt với Zustand.
- Đăng nhập bằng tài khoản mẫu DummyJSON qua NextAuth, form thanh toán kiểm tra dữ liệu bằng React Hook Form và Zod.
- Tạo và xem đơn hàng thử nghiệm; tối đa 10 đơn được lưu trong cookie của trình duyệt.

## Công nghệ

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, NextAuth, Zustand, React Hook Form, Zod và DummyJSON API.

## Chạy trên máy cá nhân

Yêu cầu Node.js 20.9 trở lên và kết nối tới `dummyjson.com` để tải sản phẩm, đăng nhập.

```bash
cd v5-nextjs/shoplite-next
npm ci
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Có thể dùng tài khoản thử nghiệm `emilys` / `emilyspass`. Để chạy bản production trên máy cá nhân:

```bash
npm run build
npm start
```

Khi triển khai, đặt `NEXTAUTH_URL` theo địa chỉ website và tạo `NEXTAUTH_SECRET` đủ mạnh. Có thể đặt `NEXT_PUBLIC_SITE_URL` (ví dụ `https://ten-du-an.vercel.app`) cho canonical URL; trên Vercel, ứng dụng cũng tự đọc `VERCEL_PROJECT_PRODUCTION_URL`. Đơn hàng chỉ là dữ liệu demo lưu trong cookie; ứng dụng chưa có thanh toán thật hay cơ sở dữ liệu.

## Demo Vercel

Chưa tìm thấy URL triển khai của dự án trong repo. URL demo sẽ được thêm vào đây khi có địa chỉ Vercel đã xác minh.

## Các phiên bản

- [`v3-ts`](v3-ts): bản TypeScript.
- [`v4-react`](v4-react): bản React.
- [`v5-nextjs/shoplite-next`](v5-nextjs/shoplite-next): bản Next.js được mô tả ở trên.
