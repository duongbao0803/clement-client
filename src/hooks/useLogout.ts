import apiSlice from "@/apis/apiSlice";
import { notify } from "@/components/common/Notification";
import { clearCart } from "@/redux/slices/cartSlice";
import { clearFavoriteCount } from "@/redux/slices/favoriteSlice";
import { setUserInfo } from "@/redux/slices/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    sessionStorage.clear();
    router.replace("/auth");
    setTimeout(() => {
      dispatch(setUserInfo(null));
      dispatch(clearCart());
      dispatch(clearFavoriteCount());
      dispatch(apiSlice.util.resetApiState());
    }, 1000);
    notify("success", "Đăng xuất thành công", 2);
  };

  return { logout };
};
