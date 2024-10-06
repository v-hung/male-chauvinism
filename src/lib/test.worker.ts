import PQueue from "p-queue";
import { runTest, TestParams, TestResult } from "./test";

const queue = new PQueue({concurrency: 8})

self.onmessage = async function(event) {

	const params = event.data as TestParams

	let data: TestResult[] = []

	if (params.numberOfTests <= 1) {
		queue.add(() => runTest(params))
	}
	else {
		Array(params.numberOfTests).fill(0).map(() => {
			queue.add(() => runTest(params))
		})
	}

	queue.on('completed', result => {
		data.push(result)
	});

	await queue.onIdle()
	self.postMessage(data);

};