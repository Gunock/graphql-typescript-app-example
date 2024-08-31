import { DeviceUpdateStatus } from '@/codegen/graphql';
import { UpToDateIcon, UpdateInProgressIcon } from '@/components/icons';

interface StatusColumnProps {
    status: DeviceUpdateStatus;
}

export default function StatusColumn(props: StatusColumnProps) {
    return (
        <>
            {props.status == DeviceUpdateStatus.UpdateInProgress && <UpdateInProgressIcon />}
            {props.status == DeviceUpdateStatus.UpToDate && <UpToDateIcon />}
        </>
    );
}
