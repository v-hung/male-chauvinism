export type TestParams = {
	numberOfFamilies: number,
	numberOfTests: number,
	membershipLimit: number
}

export type TestResult = {
	boy: number,
	girl: number
}[]

export function runTest(params: TestParams) : Promise<TestResult> {

	return new Promise((resolve, _) => {
		const result: TestResult = new Array(params.numberOfFamilies).fill(0).map(() => {

			let boy = 0, girl = 0, numberOfTimes = 1;

			let gender = Math.random() >= 0.5 ? 1 : 0

			if (gender) {
				boy = 1
			}
			else {
				girl = 1

				while (!gender && numberOfTimes < params.membershipLimit) {
					if (!boy) {
						boy = 1
					}
					
					girl += 1
					gender = Math.random() >= 0.5 ? 1 : 0

					numberOfTimes++
				}
			}

			
			return {boy, girl}
			
		})
		resolve(result)
	})
}