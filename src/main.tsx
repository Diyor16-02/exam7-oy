import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from './store/store.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { CookiesProvider } from 'react-cookie'
import { GlobalContext } from './context/Context.tsx'

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{retry:1,staleTime:60 * 10 * 1000,}
    }
})

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <GlobalContext>
                        <Toaster position="top-center" reverseOrder={false} />
                        <App />
                    </GlobalContext>
                </Provider>
            </QueryClientProvider>
        </CookiesProvider>
    </BrowserRouter>
)
