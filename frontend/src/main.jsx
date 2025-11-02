import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./public/js/myapp.js"
import {UserProvider} from './components/userContext.jsx'

createRoot(document.getElementById("root")).render(
      <>
      <UserProvider>
      <App />
      </UserProvider>
      </>
);
