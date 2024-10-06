import { Button, Checkbox, Label, TextInput, Tooltip } from "flowbite-react"
import Container from "../components/layouts/Container"
import LoadingComponent from "../components/common/LoadingComponent"
import StackedBarChart from "../components/features/StackedBarChart"
import PieChart from "../components/features/PieChart"
import TestTable from "../components/features/TestTable"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useCallback, useEffect, useRef, useState } from "react"
import { TestResult } from "../lib/test"
import TestWorker from '../lib/test.worker.ts?worker'
import { FaInfoCircle } from "react-icons/fa"

const Home = () => {

	const workerRef = useRef<Worker | null>(null)

	const [loading, setLoading] = useState(false)
	const isCompleted = useRef(false)

	const [numberOfFamilies, setNumberOfFamilies] = useState(100)
	const [numberOfTests, setNumberOfTests] = useState(1)
	const [membershipLimit, setMembershipLimit] = useState(1)
	const [limit, setLimit] = useState(false)

	const [data, setData] = useState<TestResult[]>([])
	const [selectIndex, setSelectIndex] = useState<number>(-1)

	const handelSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!workerRef.current) return

		isCompleted.current = false

		setTimeout(() => {
			if (!isCompleted.current) {
				setLoading(true)
			}
		}, 100)

		setSelectIndex(-1)

		workerRef.current.postMessage({
			numberOfFamilies,
			numberOfTests,
			membershipLimit: !limit ? Number.MAX_SAFE_INTEGER : membershipLimit
		});

	}, [limit, numberOfFamilies, numberOfTests, membershipLimit, loading, isCompleted])

	const handelClear = () => {
		setNumberOfFamilies(100)
		setNumberOfTests(1)
		setMembershipLimit(1)
		setLimit(false)
		setData([])
		setSelectIndex(-1)
	}

	useEffect(() => {
		workerRef.current = new TestWorker();

		workerRef.current.onmessage = (event) => {
			const result: TestResult[] = event.data;

			setData(result)

			setLoading(false)
			isCompleted.current = true
		};

		return () => {
			if (workerRef.current) {
				workerRef.current.terminate()
			}
		};
	}, []);

	return (
		<Container className="min-h-full flex flex-col space-y-8">
			<form action="/" method="post" className="bg-white rounded-md shadow"
				onSubmit={handelSubmit}
			>
				<div className="flex space-x-2 items-center px-6 py-3 border-b ">
					<p className="font-semibold">Kiểm tra </p>
					<Tooltip content="Kiểm tra xác xuất đẻ con gái hay con trai. Nếu đẻ liên tục đến khi có con trai thì dừng lại, con gái thì đẻ tiếp" placement="bottom">
						<FaInfoCircle />
					</Tooltip>
				</div>
				<div className="px-6 py-4">
					<div className="flex flex-wrap -mx-4 -mb-4 px-2">
						<div className="w-full sm:w-1/4 px-2 mb-4">
							<div className="mb-2 block">
								<Label htmlFor="numberOfFamilies" value="Số lượng gia đình" />
							</div>
							<TextInput id="numberOfFamilies" type="number" placeholder="Số lượng gia đình" required
								value={numberOfFamilies} onChange={(e) => setNumberOfFamilies(+e.target.value)}
							/>
						</div>

						<div className="w-1/2 sm:w-1/4 px-2 mb-4">
							<div className="mb-2 block">
								<Label htmlFor="numberOfTests" value="Số lần kiểm tra" />
							</div>
							<TextInput id="numberOfTests" type="number" placeholder="Số lần kiểm tra" required
								value={numberOfTests} onChange={(e) => setNumberOfTests(+e.target.value)}
							/>
						</div>

						<div className={`w-1/2 sm:w-1/4 px-2 mb-4 ${limit ? 'block' : 'hidden'}`}>
							<div className="mb-2 block">
								<Label htmlFor="limitNumber" value="Số lượng con tối đa" />
							</div>
							<TextInput id="limitNumber" type="number" placeholder="Số lượng con tối đa" required
								value={membershipLimit} onChange={(e) => setMembershipLimit(+e.target.value)}
							/>
						</div>
					</div>

					<div className="flex flex-wrap -mx-4 -mb-4 px-2 mt-4">

						<div className="w-full px-2 mb-4 flex items-center gap-2">
							<Checkbox id="limit" checked={limit} onChange={(e) => setLimit(e.target.checked)} />
							<Label htmlFor="limit" className="select-none">Giới hạn số thành viên trong gia đình</Label>
						</div>
					</div>
				</div>

				<div className="flex space-between px-6 pt-3 pb-6 space-x-4">
					<Button className="ml-auto" color="light" onClick={handelClear}>Làm lại</Button>
					<Button type="submit">Thực hiện</Button>
				</div>
			</form>

			<div className="flex-grow min-h-0 flex">
				<div className="relative w-full min-h-full h-auto">
					<LoadingComponent className={`absolute top-0 left-0 w-full h-full z-10 transition-all ${!loading ? 'opacity-0 invisible' : 'opacity-100 visible'} ${data.length == 0 ? 'visible' : ''}`} />

					<div className={`flex flex-col items-center space-y-8 ${data.length == 0 ? 'hidden' : ''}`}>

						{data.length > 1
							? <div className="w-full">
								<div className="flex flex-wrap -mx-2 -mb-4 justify-center">
									<div className={`w-full px-2 mb-4 ${selectIndex >= 0 ? 'md:w-2/5' : 'md:w-3/5'}`}>
										<StackedBarChart className={`flex-none w-full h-64 rounded-md shadow bg-white p-4`} data={data} setSelectIndex={setSelectIndex} />
									</div>
									{selectIndex >= 0
										? <div className="w-full md:w-3/5 px-2 mb-4 flex flex-col items-start space-y-2">
											<Button outline size="sm" onClick={() => setSelectIndex(-1)}>
												<HiOutlineArrowLeft size={16} />
											</Button>
											<TestTable className="w-full h-64" data={data[selectIndex]} />
										</div>
										: null
									}
								</div>
							</div>
							: null
						}

						<div className="w-full">
							<div className="flex flex-wrap md:flex-nowrap -mx-4 -mb-8 justify-center">
								<div className="w-full md:max-w-96 px-4 mb-8">
									<PieChart className="w-full h-64 rounded-md shadow bg-white p-4" data={data} />
								</div>
								{data.length == 1 ? <div className="w-full md:flex-grow px-4 mb-8">
									<TestTable className="w-full h-64" data={data[0]} />
								</div> : null}
							</div>
						</div>

					</div>
				</div>
			</div>
		</Container>
	)
}

export default Home