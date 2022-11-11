import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  autoClose: 3000, 
  hideProgressBar: false, 
  closeOnClick: true, 
  pauseOnHover: true, 
  draggable: true, 
  progress: undefined
}
export const toastNotify = (msg, type) => {
  switch (type.toLowerCase()) { 
    case "error": toast.error(msg, options); break;
    case "success": toast.success(msg, options); break;
    case "warn": toast.warn(msg, options); break;
    default: return null;
  }

}