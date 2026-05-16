import { register, login, getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../state/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({
    fullname,
    email,
    password,
    contact,
    isSeller,
  }) => {
    const data = await register({
      fullname,
      email,
      password,
      contact,
      isSeller,
    });
    dispatch(setUser(data.user));
  };


  
  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
  };



  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      console.log(data)
      dispatch(setUser(data.user));
      return{
        success: true,
        user : data.user
      }

    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: err.response.data.message || "Something went wrong",
      }

    } finally {
      dispatch(setLoading(false));
    }
  };







  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  }
};
