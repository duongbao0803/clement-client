"use client";
import { Form, Input } from "antd";
import { FaRegPaperPlane } from "react-icons/fa6";
import { notify } from "./common/Notification";
import { ButtonCustom } from "./ui/button";
import { InputCustom } from "./ui/input";

const Subscribe = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    notify("success", "Gửi thành công", 2);
    form.resetFields();
  };

  return (
    <section className="mt-10">
      <div className="relative h-[50vh] max-h-[992px] min-h-[100px] w-full overflow-hidden bg-[url('https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fbg-email.jpg?alt=media&token=37ee6d60-6898-41f5-b39b-d3c3cd34736c')] bg-cover bg-center transition-all duration-500 lg:h-[300px]">
        {/* <div className="container absolute inset-0 mx-auto flex items-center justify-center lg:translate-x-52">
          <div className="my-5 flex h-[50vh] max-h-[300px] w-[90vw] max-w-[600px] flex-col justify-center overflow-hidden border-4 border-white bg-white/60 p-10 transition-all duration-500">
            <h1 className="text-3xl font-extrabold text-primary md:text-5xl">
              ĐĂNG KÝ
            </h1>
            <h2 className="text-xl md:text-3xl">để nhận thông tin mới nhất</h2>
            <span className="my-5 text-sm text-[#616161] md:text-[16px]">
              Khi bạn cần ý tưởng mới cho dự án xây dựng hoặc cải tạo, hãy liên
              hệ với chúng tôi để được tư vấn!
            </span>
            <div className="flex flex-wrap gap-2">
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item className="mb-0">
                  <div className="flex flex-wrap gap-2">
                    <Input
                      name="email"
                      title="Gửi"
                      placeholder="Email"
                      className="w-[200px] max-w-[300px] lg:!w-[300px]"
                      type="email"
                      required
                    />
                    <ButtonCustom className="text-white">
                      <FaRegPaperPlane className="text-sm transition-all duration-500 lg:text-lg" />
                    </ButtonCustom>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div> */}
        {/* <div className="absolute inset-0 bg-black opacity-40" /> */}

        <div className="container absolute inset-0 mx-auto mb-[30px] mt-[30px] flex w-full items-center gap-5">
          {/* <div className="absolute inset-0 bg-black opacity-40" /> */}

          <div className="mx-10 flex-1 text-black">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">ĐĂNG KÍ NHẬN THÔNG TIN</h2>
              <p className="w-[80%]">
                Để lại địa chỉ email và chúng tôi sẽ liên hệ với bạn khi có
                thông tin mới
              </p>
            </div>
          </div>

          <div className="flex w-full flex-1">
            <Input
              type="mail"
              className="w-full rounded-none border-transparent py-4 transition-all duration-500 hover:!border-primary focus:!border-primary"
              placeholder="Địa chỉ email của bạn"
            />
            <ButtonCustom
              className="h-14 rounded-none text-lg font-medium text-white"
              onClick={handleSubmit}
            >
              ĐĂNG KÝ
            </ButtonCustom>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
