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

export type MockedResponse =
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

export type SelectResponseResult =
	| { type: "immediate"; responses: MockedResponse[] }
	| { type: "persistent"; processId: string };

export const getMockedResponses = (
	processId: string,
	responses: ResponsiveMockedResponse[],
): SelectResponseResult => {
	return {
		type: "immediate",
		responses: [
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
		],
	};
};

export const getPersistentResponse = (
	processId: string,
): SelectResponseResult => {
	return { type: "persistent", processId };
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

export const honoUninstalledErrorResponse: ResponsiveMockedResponse[] = [
	{
		type: "stderr",
		data: "bash: line 21: hono: command not found\n",
	},
	{
		type: "exit",
		exitCode: 127,
		data: "Process failed with exit code 127",
	},
];

export const honoRequestResponse: ResponsiveMockedResponse[] = [
	{
		type: "stdout",
		data: '{\n  "status": 200,\n  "body": "Hello World!",\n  "headers": {\n    "content-type": "text/plain;charset=UTF-8"\n  }\n}\n',
	},
	{
		type: "exit",
		exitCode: 0,
		data: "Process completed with exit code 0",
	},
];

export const killNothingResponse: ResponsiveMockedResponse[] = [
	{
		type: "stderr",
		data: "Usage:\n kill [options] <pid> [...]\n\nOptions:\n <pid> [...]            send signal to every <pid> listed\n -<signal>, -s, --signal <signal>\n                        specify the <signal> to be sent\n -q, --queue <value>    integer value to be sent with the signal\n -l, --list=[<signal>]  list all signal names, or convert one to a name\n -L, --table            list all signal names in a nice table\n\n -h, --help     display this help and exit\n -V, --version  output version information and exit\n\nFor more details see kill(1).\n",
	},
	{
		type: "exit",
		exitCode: 123,
		data: "Process failed with exit code 123",
	},
];

export const killResponse: ResponsiveMockedResponse[] = [
	{
		type: "stdout",
		data: "",
	},
	{
		type: "exit",
		exitCode: 0,
		data: "Process completed with exit code 0",
	},
];
