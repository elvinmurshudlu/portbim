import './App.css'
import {Outlet} from "react-router";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ConfigProvider} from "antd";

const queryClient = new QueryClient()

function App() {
  return  <QueryClientProvider client={queryClient}>
   <ConfigProvider  >
     <Outlet/>
   </ConfigProvider>
  </QueryClientProvider>
}

export default App
