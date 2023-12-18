import Access from "@/components/Access";
import DeviceInfo from "@/components/DeviceInfo";
import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

const ManagePage = () => {
    const mqttSnap = useSnapshot(mqttState);

    if (mqttSnap.ownedDevices.length === 0) {
        return (
            <div>
                <p>Bạn không sở hữu thiết bị nào!</p>
            </div>
        );
    }

    return (
        <div>
            {mqttSnap.ownedDevices.map((device) => (
                <div key={device.id}>
                    <DeviceInfo
                        id={device.id}
                        name={device.name}
                        owner={device.owner}
                    />
                    <Access accessList={["abcd@gmail.com"]} />
                </div>
            ))}
        </div>
    );
};

export default ManagePage;
