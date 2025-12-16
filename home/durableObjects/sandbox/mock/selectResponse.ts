import { AllowCommandStrings } from "../constants/allowCommands";
import {
	alreadyStartedServerResponse,
	getMockedResponses,
	getPersistentResponse,
	honoInstallResponse,
	honoRequestResponse,
	honoUninstalledErrorResponse,
	killNothingResponse,
	killResponse,
	type SelectResponseResult,
} from "./response";
import type { SandboxMock } from "./SandboxMock";

export const selectResponse = async (
	processId: string,
	stub: SandboxMock,
): Promise<SelectResponseResult> => {
	const command = atob(processId);
	switch (command) {
		case AllowCommandStrings.installHonoCli:
			await stub.installHonoCli();
			return getMockedResponses(processId, honoInstallResponse);
		case AllowCommandStrings.requestExample:
			if (!(await stub.getInstalledHonoCli())) {
				return getMockedResponses(processId, honoUninstalledErrorResponse);
			}
			return getMockedResponses(processId, honoRequestResponse);
		case AllowCommandStrings.startServer:
			if (!(await stub.getInstalledHonoCli())) {
				return getMockedResponses(processId, honoUninstalledErrorResponse);
			}
			if (await stub.getServerStarted()) {
				return getMockedResponses(processId, alreadyStartedServerResponse);
			}
			await stub.startServer();
			return getPersistentResponse(processId);
		case AllowCommandStrings.killServer:
			if (!(await stub.getServerStarted())) {
				return getMockedResponses(processId, killNothingResponse);
			}
			await stub.stopServer();
			return getMockedResponses(processId, killResponse);
	}
	return getMockedResponses(processId, []);
};
