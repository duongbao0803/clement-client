"use client";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { tableInvoice } from "@/constants";
import { PAYMENT_STATUS } from "@/enums";
import { OrderInfo } from "@/types/order.types";
import { formatTimestampWithHour, PriceFormat } from "@/utils";
import Image from "next/image";

const OrderedBill = ({ orderInfo }: { orderInfo: OrderInfo }) => {
  return (
    <>
      <main className="container mx-auto my-5 grid min-h-screen place-items-center">
        <section className="relative h-auto min-h-[800px] border-2 border-primary shadow-xl md:w-[650px] lg:w-[800px]">
          <div className="p-10">
            <div className="flex justify-between">
              <h1 className="flex items-center text-4xl font-black tracking-wider">
                HÓA ĐƠN
              </h1>
              <Image
                src={IconWeb}
                width={150}
                alt="icon"
                quality={100}
                className="mb-3"
              />
            </div>
            <div className="leading-7">
              <p>
                <span className="font-bold">Thời gian:</span>{" "}
                <span>{formatTimestampWithHour(orderInfo?.createDate)}</span>
              </p>
              <p>
                <span className="font-bold">Mã hóa đơn: </span>
                <span>#{orderInfo?.bankTranNo}</span>
              </p>
            </div>

            <div className="my-8 flex justify-between">
              <div className="max-w-[45%]">
                <h3 className="text-sm">CỬA HÀNG</h3>
                <p className="py-1 text-lg font-bold">{orderInfo?.storeName}</p>
                <p className="py-1 text-sm">{orderInfo?.storeAddress}</p>
                <p className="py-1 text-sm">{orderInfo?.storePhone}</p>
              </div>
              <div className="max-w-[45%] text-right">
                <h3 className="text-sm">KHÁCH HÀNG</h3>
                <p className="py-1 text-lg font-bold">
                  {orderInfo?.customerName}
                </p>
                <p className="py-1 text-sm">{orderInfo?.customerAddress}</p>
                <p className="py-1 text-sm">{orderInfo?.customerPhone}</p>
              </div>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full overflow-auto border-none bg-white">
                <thead className="rounded">
                  <tr>
                    {tableInvoice.map((data, index: number) => (
                      <th
                        key={index}
                        className={`border-b-2 px-6 py-3 text-left text-gray-600 ${
                          index === 0 ? "sticky left-0 z-10" : ""
                        }`}
                      >
                        {data}
                      </th>
                    ))}
                  </tr>
                </thead>
                {orderInfo?.orderDetails?.map((order, index) => (
                  <tbody key={index}>
                    <tr className="">
                      <td className="sticky left-0 z-10 bg-white px-6 py-[15px]">
                        <div className="flex items-center">
                          <span>{order?.product?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-[15px]">{order?.productUnit}</td>
                      <td className="px-6 py-[15px]">{order?.quantity}</td>
                      <td className="px-6 py-[15px]">
                        {PriceFormat.format(order?.quantity * order?.price)}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <div className="mb-10 mt-5 flex min-h-[400px] justify-center">
            <div className="flex h-[120px] w-[70%] max-w-[350px] -rotate-[15deg] flex-col items-center justify-center gap-2 rounded-3xl border-4 border-[red] font-medium text-[red] lg:h-[150px]">
              {orderInfo?.paymentStatus.includes(PAYMENT_STATUS.PAID) ? (
                <h2 className="text-2xl lg:text-3xl">ĐÃ THANH TOÁN</h2>
              ) : (
                <h2 className="text-2xl lg:text-3xl">CHƯA THANH TOÁN</h2>
              )}
              <p className="text-xl font-bold">
                {PriceFormat.format(orderInfo?.total)}
              </p>
              <p>{formatTimestampWithHour(orderInfo?.createDate)}</p>
            </div>
          </div>
          {/* footer */}
          <div className="absolute bottom-0 min-h-[150px] w-full bg-primary px-10 py-5">
            <div className="flex justify-between font-bold text-white">
              <p>Thông tin bổ sung</p>
              <p>Tổng</p>
            </div>
            <div className="my-2 h-[2px] w-full bg-white" />
            <div className="grid grid-cols-1 sm:grid-cols-5">
              <div className="col-span-3">
                <div className="grid grid-cols-3 leading-8">
                  <div className="col-span-1 font-semibold text-white">
                    <p>Cửa hàng:</p>
                    <p>Điều khoản:</p>
                  </div>
                  <div className="col-span-2 text-left text-gray-200">
                    <p> {orderInfo?.storeName}</p>
                    <p>Thanh toán 100%</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 col-start-4">
                <div className="grid grid-cols-3 leading-8">
                  <div className="col-span-2 font-semibold text-white">
                    <p>Tạm tính:</p>
                    <p>Phí vận chuyển</p>
                    <p>Tổng:</p>
                  </div>
                  <div className="col-span-1 text-right text-gray-200">
                    <p>
                      {PriceFormat.format(
                        (orderInfo?.total || 0) - (orderInfo?.shipFee || 0),
                      )}
                    </p>
                    <p>{PriceFormat.format(Number(orderInfo?.shipFee || 0))}</p>
                    <p>{PriceFormat.format(orderInfo?.total || 0)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 h-[2px] w-full bg-white" />
            <p className="text-center text-white">
              Xin cảm ơn quý khách đã mua hàng tại Fricks
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderedBill;
