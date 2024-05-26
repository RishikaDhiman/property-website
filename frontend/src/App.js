import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Sale from "./components/Sale";
import Buy from "./components/Buy";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProperties from "./components/MyProperties";
import Property from "./components/Property";
import MyProperty from "./components/MyProperty";

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/",
      element:<ProtectedRoute/>,
      children:[
        {
          path:"/homepage",
          element: <Home/>
        },
        {
          path:"/sale",
          element: <Sale/>
        },
        {
          path:"/buy",
          element: <Buy/>
        },
        {
          path:"/buy/:id",
          element: <Property/>
        },
        {
          path:"/my-properties",
          element: <MyProperties/>
        },
        {
          path:"/my-properties/:id",
          element: <MyProperty/>
        },
        {
          path:"/my-property/:id",
          element: <Sale/>
        }
      ]
    },
   
  ])


  return (
    <div className="App">
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
