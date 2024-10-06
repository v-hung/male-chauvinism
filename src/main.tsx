import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router.tsx'
// import { register } from 'swiper/element/bundle';
import dayjs from "dayjs"
import "dayjs/locale/vi"
import Chart from "chart.js/auto";
import { BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ZoomPlugin from 'chartjs-plugin-zoom';

dayjs.locale('vi')

// register()
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ZoomPlugin);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
)
