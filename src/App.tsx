import './App.css'
import {Outlet} from "react-router";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ConfigProvider} from "antd";
import Navbar from "@/components/Navbar.tsx";

const queryClient = new QueryClient()

function App() {
    return <QueryClientProvider client={queryClient}>
        <ConfigProvider>
            <Navbar/>
            <Outlet/>
        </ConfigProvider>
    </QueryClientProvider>
}

export default App
