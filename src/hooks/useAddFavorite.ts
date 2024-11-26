import { useAddFavoriteMutation } from "@/apis/favoriteProductApi";
import { notify } from "@/components/common/Notification";
import { incrementFavoriteCount } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFavorite = () => {
  const [loading, setLoading] = useState(false);
  const isFavorite = useSelector(
    (state: RootState) => state.persistedReducer.favorites.isFavorite,
  );
  const dispatch = useDispatch();

  const [addFavorite] = useAddFavoriteMutation();

  const toggleFavorite = async (productId: number) => {
    setLoading(true);

    try {
      if (!isFavorite) {
        notify("success", "Sản phẩm đã có trong danh sách yêu thích", 2);
      } else {
        await addFavorite({
          productId: productId,
        }).unwrap();
        notify("success", "Thêm vào danh sách yêu thích thành công", 2);
        dispatch(incrementFavoriteCount());
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return { isFavorite, toggleFavorite, loading };
};
