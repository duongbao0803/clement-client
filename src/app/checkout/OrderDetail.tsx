"use client";
import { useOrderMutation } from "@/apis/orderApi";
import { useGetStoreDetailQuery } from "@/apis/storeApi";
import VietQR from "@/assets/images/icons/vietqr.jpeg";
import { notify } from "@/components/common/Notification";
import { ButtonCustom } from "@/components/ui/button";
import { tableData } from "@/constants";
import { PAYMENT } from "@/enums";
import useUserInfo from "@/hooks/useUserInfo";
import { RootState } from "@/redux/store";
import { PriceFormat } from "@/utils";
import { Divider, Radio, RadioChangeEvent } from "antd";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import InfoModal from "./InfoModal";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const { userInfo } = useUserInfo();
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );
  const { data: store } = useGetStoreDetailQuery({
    storeId: cartData?.cart[0]?.storeId,
  });

  const userForm = sessionStorage.getItem("form");
  const data = userForm ? JSON.parse(userForm) : {};

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const [checkoutAPI] = useOrderMutation();

  const transformedData = cartData?.cart?.map(
    (item: { id: any; price: { unitId: any }[]; quantity: any }) => ({
      productId: item?.id,
      productUnitId: item.price[0].unitId,
      quantity: item.quantity,
    }),
  );

  const checkout = {
    shipFee: store?.defaultShip,
    voucherCode: data?.ward === "Tân Phú" ? "FSTANPHU" : "ABC",
    productOrders: transformedData,
    customerPhone: data?.phoneNumber,
    customerAddress: `${data?.address}, ${data?.ward}, ${data?.district}, ${data?.city}`,
    paymentMethod: value,
  };

  let discount = data?.ward === "Tân Phú" ? store?.defaultShip : 0;

  const handlePayment = async () => {
    if (!isConfirm) {
      notify("info", "Vui lòng xác nhận lại đơn hàng trước khi thanh toán", 2);
      return;
    }
    try {
      const res = await checkoutAPI(checkout);
      if (res && res.data) {
        notify(
          "success",
          "Đặt đơn hàng thành công. Vui lòng chờ sau 3s để thanh toán",
          3,
        );
        setTimeout(() => {
          window.location.href = `${res?.data?.checkoutUrl}`;
        }, 3000);
      } else {
        notify(
          "error",
          "Đặt hàng không thành công. Vui lòng điền đầy đủ thông tin đặt hàng",
          3,
        );
      }
    } catch (err) {}
  };
  return (
    <section className="pb-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="col-span-1 overflow-x-auto lg:col-span-2">
          <div className="flex justify-between">
            <h1 className="mb-2 font-medium text-[#757575]">
              Thông tin liên hệ
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className="group relative float-right mb-3 cursor-pointer font-normal text-primary hover:text-primary"
            >
              Thêm thông tin
              <span className="absolute bottom-[-2px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </div>

          <div className="min-w-full border border-gray-300 bg-[#fff] p-5">
            <div className="grid grid-cols-5 leading-8">
              <div className="col-span-1">
                <p>Email:</p>
                <p>Họ và tên:</p>
                <p>Địa chỉ:</p>
                <p>Số điện thoại:</p>
              </div>
              <div className="col-span-4">
                <p>{data?.email || "Chưa có thông tin"}</p>
                <p>{data?.fullName || "Chưa có thông tin"}</p>
                <p>
                  {data?.address
                    ? `${data.address}, ${data.ward}, ${data.district}, ${data.city}`
                    : "Chưa có thông tin"}
                </p>

                <p>{data?.phoneNumber || "Chưa có thông tin"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="border border-gray-300 bg-white">
            <div className="flex h-[48.8px] items-center pl-4">
              <span className="font-bold text-gray-600">Thành tiền</span>
            </div>
            <div className="flex flex-1 items-center justify-between p-4">
              <div className="flex flex-col gap-5">
                <span className="font-semibold text-gray-500">Tạm tính:</span>
                <span className="font-semibold text-gray-500">
                  Phí vận chuyển:
                </span>
                <span className="font-semibold text-gray-500">Khuyến mãi:</span>
              </div>
              <div className="flex flex-col items-end gap-5">
                <span> {PriceFormat.format(cartData?.totalPrice ?? 0)}</span>
                <span>{PriceFormat.format(store?.defaultShip)}</span>
                <span>{PriceFormat.format(discount ?? 0)}</span>
              </div>
            </div>
            <div className="mx-4">
              <Divider className="!m-0 bg-gray-300" />
            </div>
            <div className="flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Tổng</span>
                <span className="font-bold text-primary">
                  <span>
                    {PriceFormat.format(
                      cartData?.totalPrice +
                        (store?.defaultShip || 0) -
                        discount,
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="mb-2 font-medium text-[#757575]">Đơn hàng của bạn</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="flex items-center gap-1">
            <span className="rounded-sm bg-[#d0011b] px-2 py-1 text-[12px] text-[#fff]">
              FMALL
            </span>
            <h1>{store?.name}</h1>
          </div>
          <div></div>
          <div className="col-span-1 overflow-auto lg:col-span-2">
            <table className="min-w-full overflow-auto border border-gray-300 bg-white">
              <thead className="rounded bg-thirdly">
                <tr>
                  {tableData.map((data, index: number) => (
                    <th
                      key={index}
                      className={`px-6 py-3 text-left text-gray-600 ${
                        index === 0 ? "sticky left-0 z-10 bg-thirdly" : ""
                      }`}
                    >
                      {data}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cartData?.cart?.map((item, index: number) => (
                  <>
                    <tr className="border-t" key={index}>
                      <td className="sticky left-0 z-10 bg-white px-6 py-[34px]">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={item?.image}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Product Image"
                          />
                          <span>{item?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-[34px]">
                        {PriceFormat.format(item?.price[0].price ?? 0)}
                      </td>
                      <td className="px-6 py-[34px]">
                        {item?.price[0]?.unit.name}
                      </td>
                      <td className="px-6 py-[34px]">{item?.quantity}</td>
                      <td className="px-6 py-[34px]">
                        {PriceFormat.format(item?.totalProductPrice ?? 0)}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-1">
            <div className="mb-8 border border-gray-300 bg-white">
              <label className="block rounded bg-[#fafafa] p-4 font-semibold">
                Phương thức thanh toán
              </label>
              <div className="px-5 py-3">
                <Radio.Group
                  onChange={onChange}
                  className="w-full"
                  value={value}
                >
                  {/* {infoUser && infoUser?.role === Role.MEMBER && ( */}
                  <div className="relative mb-5 flex h-[77px] w-full items-center justify-between rounded border border-[#bebcbc] p-5 hover:border-primary">
                    <Radio
                      value={PAYMENT.VIETQR}
                      className="w-full object-cover"
                      defaultChecked
                    >
                      <div className="inline w-full">
                        <div className="border-1 w-full">Thanh toán VIETQR</div>
                      </div>
                    </Radio>
                    <div className="ml-4">
                      <Image
                        src={VietQR}
                        alt="Logo-vietqr"
                        className="w-full object-cover"
                        height={50}
                        width={50}
                        quality={100}
                      />
                    </div>
                  </div>
                  <div className="relative mb-5 flex h-[77px] w-full items-center justify-between rounded border border-[#bebcbc] p-5 hover:border-primary">
                    <Radio
                      value={PAYMENT.VNPAY}
                      className="w-full object-cover"
                      defaultChecked
                    >
                      <div className="inline w-full">
                        <div className="border-1 w-full">Thanh toán VNPAY</div>
                      </div>
                    </Radio>
                    <div className="ml-4">
                      {/* <Image
                        src={VietQR}
                        alt="Logo-vietqr"
                        className="w-full object-cover"
                        height={50}
                        width={50}
                        quality={100}
                      /> */}
                    </div>
                  </div>
                </Radio.Group>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    required
                    onChange={(e) => setIsConfirm(e.target.checked)}
                  />
                  <p className="text-sm text-gray-500">
                    Vui lòng xác nhận lại đơn hàng trước khi thanh toán
                  </p>
                </div>
                <ButtonCustom
                  className="mt-5 h-10 w-full transform rounded py-1 text-white transition-all duration-500 active:scale-95"
                  onClick={handlePayment}
                >
                  Thanh toán
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal userInfo={userInfo} isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default OrderDetail;
