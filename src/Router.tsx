import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LazyLoad from "./components/common/LazyLoad";
const Error404Lazy = lazy(() => import('./pages/Error404'))
const ErrorLazy = lazy(() => import('./pages/Error'))

const router = createBrowserRouter([
	{
		async lazy() {
			const MainLayout = (await import('./components/layouts/MainLayout')).default
			return { Component: MainLayout }
		},
		children: [{
			errorElement: <Suspense fallback={<LazyLoad />}><ErrorLazy /></Suspense>,
			children: [
				{
					path: "/",
					async lazy() {
						const Component = (await import("./pages/Home")).default

						return { Component }
					}
				},

				{
					path: '/*',
					element: <Suspense fallback={<LazyLoad />}>
						<Error404Lazy />
					</Suspense>,
				}
			]
		}]
	}
])

export default router