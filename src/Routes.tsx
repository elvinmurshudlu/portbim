import {createBrowserRouter} from "react-router";
import App from "./App.tsx";
import DesignerPage from "./pages/Designer/DesignerPage.tsx";
import ModelsPage from "./pages/Models/ModelsPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                Component: DesignerPage
            },
            {
                path: "/models",
                Component: ModelsPage
            }
        ]
    }
])