import { AuthRoute, DashboardRoute } from "./routes";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(['token'])
  return cookies.token ? <DashboardRoute /> : <AuthRoute />
}

export default App


// header partda me ga request beraman
// Role qilish kerak