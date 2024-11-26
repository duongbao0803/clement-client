import { useSelector } from "react-redux";
import { RootState } from "../store";

const useUserSelector = () => {
  const userInfo = useSelector(
    (state: RootState) => state.persistedReducer.user.userInfo,
  );

  return { userInfo };
};

export default useUserSelector;
