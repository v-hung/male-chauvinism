import { ChartData, ChartOptions } from 'chart.js'
import { FC, HTMLAttributes, useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'
import { TestResult } from '../../lib/test'

type State = HTMLAttributes<HTMLDivElement> & {
	data: TestResult[]
}

const PieChart: FC<State> = (props) => {
	const { className, data, ...rest } = props

	const chartData: ChartData<"pie"> = useMemo(() => {
		const { boy, girl } = data.reduce((acc, item) => {
			const totals = item.reduce((accumulator, current) => {
				return {
					boy: accumulator.boy + current.boy,
					girl: accumulator.girl + current.girl,
				};
			}, { boy: 0, girl: 0 })

			acc.boy += totals.boy;
			acc.girl += totals.girl;

			return acc;
		}, { boy: 0, girl: 0 })

		return {
			labels: ["Số nữ", "Số nam"],
			datasets: [
				{
					label: 'Kiểm tra',
					data: [girl, boy],
					backgroundColor: ["#ef4444", "#06b6d4"],
				}
			]
		}
	}, [data])



	const options: ChartOptions<"pie"> = {
		plugins: {
			title: {
				display: true,
				text: 'Tổng số nam và nữ qua các lần kiểm tra'
			},
			legend: {
				position: 'top',
			},
			datalabels: {
				formatter: (value: number, context: any) => {
					const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
					const percent = ((value / total) * 100).toFixed(2);
					return `${percent}%`
				},
				color: '#fff'
			}
		},
		responsive: true,
		maintainAspectRatio: false
	}

	return (
		<div {...rest} className={twMerge('', className)}>
			<Pie data={chartData} options={options} className='!w-full' />
		</div>
	)
}

export default PieChart