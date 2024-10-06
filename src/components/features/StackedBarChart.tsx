import { Chart, ChartData, ChartOptions } from 'chart.js'
import { FC, HTMLAttributes, useMemo, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'
import { TestResult } from '../../lib/test'

type State = HTMLAttributes<HTMLDivElement> & {
	data: TestResult[],
	setSelectIndex: React.Dispatch<React.SetStateAction<number>>
}

const StackedBarChart: FC<State> = (props) => {
	const { className, data, setSelectIndex, ...rest } = props

	const chartRef = useRef<Chart<"bar", number[], string>>(null);
	const showDatalabels = useRef(true);

	const chartData: ChartData<"bar"> = useMemo(() => {
		const counts = data.reduce((acc, item) => {
			const totals = item.reduce((accumulator, current) => {
				return {
					boy: accumulator.boy + current.boy,
					girl: accumulator.girl + current.girl,
				};
			}, { boy: 0, girl: 0 })

			acc.push(totals)

			return acc;
		}, [])

		// if (chartRef.current) {
		// 	const totalDataPoints = data.length;
		// 	const initialZoomFactor = totalDataPoints > 10 ? 10 / totalDataPoints : 1;

		// 	chartRef.current.zoom(initialZoomFactor);
		// }

		showDatalabels.current = data.length <= 10

		if (chartRef.current) {
			chartRef.current.options.plugins!.datalabels!.display = showDatalabels.current;
			chartRef.current.update();
		}

		return {
			labels: data.map((_, i) => `Lần ${i + 1}`),
			datasets: [
				{
					label: 'Số nữ',
					data: counts.map(v => v.girl),
					backgroundColor: "#ef4444",
				},
				{
					label: 'Số nam',
					data: counts.map(v => v.boy),
					backgroundColor: "#06b6d4",
				}
			]
		}

	}, [data])

	const options: ChartOptions<"bar"> = useMemo(() => {
		return {
			plugins: {
				title: {
					display: true,
					text: 'Số nam và nữ qua từng lần kiểm tra'
				},
				datalabels: {
					display: showDatalabels.current,
					color: '#fff'
				},
				zoom: {
					zoom: {
						wheel: {
							enabled: true,
						},
						pinch: {
							enabled: true
						},
						mode: 'x',
						onZoom: ({ chart }) => {
							const xScale = chart.scales.x;
							const zoomLevel = xScale.max - xScale.min;

							if (zoomLevel <= 10) {
								showDatalabels.current = true
							} else {
								showDatalabels.current = false
							}

							if (chartRef.current) {

								chartRef.current.options.plugins!.datalabels!.display = showDatalabels.current;
								chartRef.current.update();
							}
						},
					},
					pan: {
						enabled: true,
						mode: 'x',
					},
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true
				}
			},
			onClick: (_, elements, __) => {
				if (elements.length > 0) {
					setSelectIndex(elements[0].index)
				}
			}
		}
	}, [showDatalabels])

	return (
		<div {...rest} className={twMerge('', className)}>
			<Bar ref={chartRef} data={chartData} options={options} className='!w-full' />
		</div>
	)
}

export default StackedBarChart
