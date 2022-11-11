import AppRouter from './app-router/AppRouter';
import AuthProvider from './contexts/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AuthProvider>
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
      <AppRouter/>
    </AuthProvider>
  );
}

export default App;
