import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, AddJob, AllJobs, Login, Signup, Editjob, Job} from './pages/index.js';
import App from './App';
import "@fontsource/inter"; 
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import AuthLayout from './Components/AuthLayout.jsx';
import 'remixicon/fonts/remixicon.css';



const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/signup",
        element : <Signup/>
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : "/add-job",
        element : <AuthLayout authentication={true}>
          <AddJob/>
        </AuthLayout>
      },
      {
        path :"/all-jobs",
        element : <AuthLayout authentication={true}>
            <AllJobs/>
        </AuthLayout>
      },
      {
        path :"/job/:slug",
        element : <AuthLayout authentication={true}>
            <Job/>
        </AuthLayout>
      },
      {
        path : "/edit-job/:slug",
        element : <AuthLayout authentication={true}>
          <Editjob/>
        </AuthLayout>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>  
  </StrictMode>,
)
