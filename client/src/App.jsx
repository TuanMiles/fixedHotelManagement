
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import RoomsPage from "./pages/RoomsPage";
import RoomDetail from "./pages/RoomDetail";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Support from "./pages/Support";
import { ModalProvider } from "./ModalContext";


function App() {
  // useEffect(() => {
  //   Axios.get('http://localhost:5000/api')
  //     .then((res) => {
  //       console.log(res.data)
  //       setData(res.data)
  //     })
  // }, [])

  return (
    <ModalProvider>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/roomdetail/:id" element={<RoomDetail />} />
        <Route path="/roomdetail/:id/bookingpage" element={<BookingPage />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/admin/reservations" element={<AdminPage />} />
        <Route path="/admin/reservations/confirmed" element={<AdminPage />} />
        <Route path="/admin/reservations/cancelled" element={<AdminPage />} />
        <Route path="/admin/rooms" element={<AdminPage />} />
        <Route path="/admin/rentalreceipt" element={<AdminPage />} />
        <Route path="/admin/customers" element={<AdminPage />} />
        <Route path="/admin/staffs" element={<AdminPage />} />
        <Route path="/admin/revenue" element={<AdminPage />} />
        <Route path="/admin/roomstype" element={<AdminPage />} />
        <Route path="/support" element={<Support/>}/>
      </Routes>
    </ModalProvider>
  );
}
export default App;
