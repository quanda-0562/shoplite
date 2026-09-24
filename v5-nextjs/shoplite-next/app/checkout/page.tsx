import { CheckoutForm } from "../components/CheckoutForm";

export default function CheckoutPage() {
  return <section className="mx-auto max-w-xl"><h1 className="text-3xl font-black">Thanh toán</h1><p className="mt-2 text-slate-600">Điền thông tin giao hàng để tạo đơn.</p><CheckoutForm /></section>;
}
