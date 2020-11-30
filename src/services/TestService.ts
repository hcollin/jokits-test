import { JokiEvent, JokiService, JokiServiceApi } from "jokits";

export interface TestData {
    id: string;
    name: string;
    counter: number;
}

export default function createTestService(serviceId: string, api: JokiServiceApi): JokiService<TestData> {
    let data: TestData[] = [];

    function eventHandler(event: JokiEvent, worker: ((data: any) => void) | null) {
        if (event.to === serviceId) {
            switch (event.action) {
                case "add":
                    addItem(event.data);
                    break;
            }
        }
    }

    function addItem(item: TestData) {
        data.push(item);
        sendUpdate();
    }

    function getState(): TestData[] {
        return [...data];
    }

    function sendUpdate() {
        api.updated(data);
    }

    return {
        eventHandler,
        getState,
    };
}
