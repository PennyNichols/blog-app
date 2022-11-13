import AppRouter from "./app-router/AppRouter";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogProvider from "./contexts/BlogContext";
import ProfileProvider from "./contexts/ProfileContext";

function App() {
	return (
		<AuthProvider>
			<ProfileProvider>
				<BlogProvider>
					<ToastContainer
						position="top-right"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					<AppRouter />
				</BlogProvider>
			</ProfileProvider>
		</AuthProvider>
	);
}

export default App;
