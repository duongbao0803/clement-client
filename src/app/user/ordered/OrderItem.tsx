"use client";
import { TagCustom } from "@/components/common";
import { ButtonCustom } from "@/components/ui/button";
import { PAYMENT_STATUS } from "@/enums";
import { OrderInfo } from "@/types/order.types";
import { PriceFormat, formatTimestamp } from "@/utils";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  SyncOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

interface OrderItemProps {
  order: OrderInfo;
  showLoading: (orderId: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, showLoading }) => {
  return (
    <div className="mx-auto mb-5 rounded-xl bg-[#fff] p-3 shadow-sm transition-all duration-500">
      <div className="flex flex-wrap justify-between">
        <h3 className="font-semibold text-primary">#{order?.code}</h3>
        <div className="flex flex-wrap items-center gap-3 font-medium">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <p className="text-gray-500">Trạng thái:</p>
            {order?.paymentStatus.includes(PAYMENT_STATUS.PAID) ? (
              <TagCustom
                className="!mr-0"
                label="ĐÃ THANH TOÁN"
                color="green"
                closable={false}
              />
            ) : order?.paymentStatus.includes(PAYMENT_STATUS.FAILED) ? (
              <TagCustom
                className="!mr-0"
                label="THANH TOÁN THẤT BẠI"
                color="red"
                closable={false}
              />
            ) : (
              <TagCustom
                className="!mr-0"
                label="CHƯA THANH TOÁN"
                color="blue"
                closable={false}
              />
            )}
          </div>
          <div className="h-full w-[1px] bg-gray-500" />
          <div className="flex items-center gap-1 text-gray-500">
            <TbTruckDelivery />{" "}
            <span className="text-sm">
              {formatTimestamp(order?.paymentDate)}
            </span>
          </div>
        </div>
      </div>
      <Divider className="!my-2 bg-gray-200"></Divider>
      <div>
        <div className="my-6 flex items-center justify-between gap-7 px-2 text-sm">
          <div className="flex flex-col gap-4">
            <div>
              <p>{order?.storeName}</p>
              <p>{order?.storeAddress}</p>
              <p>{order?.storePhone}</p>
            </div>
          </div>
          <div>
            <FaArrowRightLong size={20} color="orange" />
          </div>
          <div className="flex justify-end gap-4">
            <div className="text-end">
              <p>{order?.customerName}</p>
              <p>{order?.customerAddress}</p>
              <p>{order?.customerPhone}</p>
            </div>
          </div>
        </div>
        <Divider className="!m-0 bg-gray-200"></Divider>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col justify-between gap-3">
            {order?.paymentStatus.includes(PAYMENT_STATUS.PAID) ? (
              <div className="flex gap-2 text-sm text-[green]">
                <CheckCircleFilled color="green" />
                <p>Đang giao hàng...</p>
              </div>
            ) : order?.paymentStatus.includes(PAYMENT_STATUS.PENDING) ? (
              <div className="flex gap-2 text-sm text-[#0059ff]">
                <SyncOutlined spin color="#0059ff" />
                <p>Đang chờ...</p>
              </div>
            ) : (
              <div className="flex gap-2 text-sm text-[red]">
                <CloseCircleFilled color="red" />
                <p>Đã hủy</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-5">
              <div>Tạm tính:</div>
              <div>
                {PriceFormat.format(
                  (order?.total || 0) - (order?.shipFee || 0),
                )}
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div>Phí vận chuyển:</div>
              <div>{PriceFormat.format(order?.shipFee || 0)}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div>Khuyến mãi:</div>
              <div>{PriceFormat.format(0)}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div>Tổng:</div>
              <div>{PriceFormat.format(order?.total)}</div>
            </div>
            <div className="w-full">
              <ButtonCustom
                onClick={() => showLoading(order.id)}
                className="float-right w-[60%] text-white"
              >
                Chi tiết
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
