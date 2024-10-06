import { Outlet } from "react-router-dom"
import Header from "./partials/Header"
import ScrollToTop from "../utils/ScrollToTop"
import ProgressIndicator from "../utils/ProgressIndicator"
import { Helmet } from "react-helmet"
import SnackBar from "../utils/SnackBar"
import Footer from "./partials/Footer"

const MainLayout = () => {

	return (
		<>
			<Helmet>
				<title>Việt Hùng - Male Chauvinism</title>
				<link rel="author" href="https://github.com/v-hung"></link>
				<meta name="author" content="Việt Hùng"></meta>
			</Helmet>
			<div className="flex bg-gray-100">
				<div className="w-full flex-grow flex flex-col min-h-screen">
					<Header className="sticky top-0" />
					<div className="flex-grow min-h-0 py-6">
						<Outlet />
					</div>
					<Footer />
				</div>
			</div>

			<ScrollToTop />
			<ProgressIndicator />
			<SnackBar />
		</>
	)
}

export default MainLayout