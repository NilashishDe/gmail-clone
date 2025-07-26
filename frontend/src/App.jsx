import Body from "./components/Body.jsx";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inbox from "./components/Inbox.jsx";
import Mail from "./components/Mail.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Drafts from "./components/Drafts.jsx";
import Sent from "./components/Sent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      },
      {
        path: "/drafts",
        element: <Drafts />
      },
      {
        path: "/sent",
        element: <Sent />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  return (
    <div className="bg-[#F6F8FC] h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
