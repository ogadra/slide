type ResponsiveMockedResponse =
	| {
			type: "stdout" | "stderr";
			data: string;
	  }
	| {
			type: "exit";
			exitCode: number;
			data: string;
	  };

type MockedResponse =
	| {
			type: "process_info";
			command: string;
			status: "running";
			processId: string;
	  }
	| {
			type: "stdout" | "stderr";
			data: string;
			processId: string;
	  }
	| {
			type: "exit";
			exitCode: number;
			data: string;
			processId: string;
	  };

export const getMockedResponses = (
	processId: string,
	responses: ResponsiveMockedResponse[],
): MockedResponse[] => {
	return [
		{
			type: "process_info",
			command: atob(processId),
			status: "running",
			processId,
		},
		...responses.map((response) => ({
			...response,
			processId,
		})),
	];
};

export const honoInstallResponse: ResponsiveMockedResponse[] = [
	{
		type: "stdout",
		data: "added 6 packages in 1s\n",
	},
	{
		type: "exit",
		exitCode: 0,
		data: "Process completed with exit code 0",
	},
];
