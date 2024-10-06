import { Table } from 'flowbite-react'
import { FC, HTMLAttributes, MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { TestResult } from '../../lib/test'
import { generatePaginationArray, Page } from '../../lib/pagination'

type State = HTMLAttributes<HTMLDivElement> & {
	data: TestResult
}

const TestTable: FC<State> = (props) => {
	const { className, data, ...rest } = props


	const [page, setPage] = useState(1)
	const perPage = useRef(100)
	const [pageList, setPageList] = useState<Page[]>([])

	const [tableData, setTableData] = useState(data.slice(0, perPage.current))

	const MAX_PAGE = useMemo(() => Math.ceil(data.length / perPage.current), [data])


	const changePage = (e: MouseEvent, page: number | null) => {
		e.preventDefault()

		if (page) {
			setPage(page)
		}
	}

	useEffect(() => {
		setTableData(data.slice(0, perPage.current))
	}, [data])

	useEffect(() => {
		setTableData(data.slice((page - 1) * perPage.current, page * perPage.current))
		setPageList(generatePaginationArray(page, MAX_PAGE))
	}, [page, perPage])

	return (
		<div {...rest} className={twMerge('flex flex-col', className)}>
			<div className="flex-grow min-h-0 overflow-y-auto relative overflow-x-auto shadow rounded">
				<Table>
					<Table.Head className='sticky top-0'>
						<Table.HeadCell className='p-2 sm:px-4 sm:py-3 md:px-6 md:py-4'>Thứ tự</Table.HeadCell>
						<Table.HeadCell className='p-2 sm:px-4 sm:py-3 md:px-6 md:py-4'>Số nam</Table.HeadCell>
						<Table.HeadCell className='p-2 sm:px-4 sm:py-3 md:px-6 md:py-4'>Số nữ</Table.HeadCell>
						<Table.HeadCell className='p-2 sm:px-4 sm:py-3 md:px-6 md:py-4 w-0'>Biểu đồ</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{tableData.map((item, index) => (
							<Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white bg-white p-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
									Gia đình {index + 1}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
									{item.boy}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
									{item.girl}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
									<div className="w-10 h-3 md:w-28 md:h-5 flex items-stretch">
										<div className="flex-none bg-cyan-500" style={{ width: `${item.boy / (item.boy + item.girl) * 100}%` }}></div>
										<div className="flex-grow bg-red-500"></div>
									</div>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
			<nav className="flex-none flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-2 select-none" aria-label="Table navigation">
				<span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Hiển thị <span className="font-semibold text-gray-900">{(page - 1) * perPage.current + 1} - {Math.min(data.length, page * perPage.current)}</span> của <span className="font-semibold text-gray-900">{data.length}</span></span>
				<ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
					<li>
						<a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={(e) => changePage(e, Math.max(1, page - 1))}>Previous</a>
					</li>
					{pageList.map((item, index) => (
						<li key={index}>
							<a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${item.active ? '!text-blue-600 !bg-blue-50 !hover:bg-blue-100 !hover:text-blue-700 pointer-events-none' : ''}`}
								onClick={(e) => changePage(e, item.page)}
							>{item.label}</a>
						</li>
					))}
					<li>
						<a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={(e) => changePage(e, Math.min(page + 1, MAX_PAGE))}>Next</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default TestTable