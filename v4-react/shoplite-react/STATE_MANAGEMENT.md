# State Management - ShopLite

## Cây quyết định

1. Dữ liệu đến từ API? Dùng server state với TanStack Query.
2. Cần copy URL, bookmark, Back/Forward? Dùng URL state.
3. Chỉ một vùng giao diện dùng? Dùng local state.
4. Là dữ liệu nhập và validation? Dùng form state.
5. Nhiều nơi xa nhau cùng đọc/ghi, không phải dữ liệu API? Dùng global client store.

## Phân loại state

| State | Loại đúng | Công cụ | Trạng thái trong ShopLite | Lý do |
| --- | --- | --- | --- | --- |
| Danh sách sản phẩm, giá, rating, stock | Server state | TanStack Query: `useProducts`, key `['products']` | Đã đúng | DummyJSON là nguồn sự thật; Query lo cache, loading, error, refetch. |
| Chi tiết sản phẩm | Server state | TanStack Query: `useProduct`, key `['product', id]` | Đã đúng | Mỗi `id` có dữ liệu và cache riêng. |
| `isLoading`, `isError`, `error` của sản phẩm | Server query state | TanStack Query | Đã đúng | Đây là trạng thái của request, không cần `useState` tự quản lý. |
| ID sản phẩm đang xem | URL state | React Router: `/products/:id` | Đã đúng | Có thể bookmark, share URL, reload và dùng Back/Forward. |
| Từ khóa search, filter, sort, page | URL state | `useSearchParams` | Tạm thời là `useState` ở `App` | Search nên đi lên URL khi cần share/bookmark; local state chỉ phù hợp cho ô tìm kiếm tạm. |
| Giỏ hàng, quantity, coupon | Global client state | Zustand + `persist` | Tạm thời là `useState` ở `App` | Header, product card, chi tiết, cart và checkout đều cần đọc/ghi; cần giữ qua reload. |
| Theme light/dark | Global client state | Context hoặc Zustand + localStorage | Chưa triển khai | Toàn app dùng nhưng không đến từ API; Context đủ khi state nhỏ, ít đổi. |
| Mở/đóng modal, dropdown, hover, input UI tạm | Local UI state | `useState` ở component cha gần nhất | Chưa triển khai | Không global hóa state chỉ một khu vực sử dụng. |
| Login, contact, địa chỉ/checkout form | Form state | React Hook Form + Zod | Đăng nhập/liên hệ đã đúng | RHF quản lý values, errors, submit; Zod đảm bảo validation. |
| Phiên đăng nhập và user profile | Server state + global UI | Cookie/session + query profile; Context cho UI | Chưa triển khai | Server quyết định quyền truy cập; UI toàn app chỉ đọc trạng thái đã xác thực. |
| Bước checkout | Local UI hoặc URL state | `useState`; URL/persist khi cần khôi phục | Chưa triển khai | Wizard ngắn dùng local; cần share/khôi phục thì dùng URL hoặc persist. |

## Ranh giới kiến trúc

- Không copy `products` từ TanStack Query vào Zustand/Redux: đó là server state.
- Không dùng TanStack Query để quản lý `cartItems`: giỏ là client state do người dùng thao tác.
- Không đưa mọi modal/input vào Zustand: bắt đầu bằng local state, chỉ nâng lên khi nhiều component xa nhau cần dùng.

## Roadmap gần nhất

1. Chuyển `query` trong `App.tsx` sang `useSearchParams`.
2. Chuyển `cartItems` sang Zustand store với `persist`.
3. Thêm ThemeContext hoặc Zustand theme store tùy độ phức tạp.
