import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string;
};

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  children,
  role,
}: {
  children: ReactNode;
}) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  if (role !== user?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
