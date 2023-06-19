import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutCointainer } from "./styles";

export function RootLayout() {
  return (
    <LayoutCointainer>
      <Header />
      <Outlet />
    </LayoutCointainer>
  );
}
