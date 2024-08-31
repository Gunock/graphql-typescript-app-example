import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Header } from 'semantic-ui-react';

import { useQuery } from '@apollo/client';

import { gql } from '@/codegen';
import { DataTable, type DataTableColumnDefinition, SortObject } from '@/components/DataTable';
import { Pagination } from '@/components/Pagination';
import StatusColumn from '@/components/StatusColumn';
import { UnauthorizedUserIcon } from '@/components/icons';
import { mapDeviceData } from '@/utils/mappers';
import { DeviceData } from '@/utils/models';

const GetDevices = gql(/* GraphQL */ `
    query GetDevices($sortingOrder: DeviceOrder, $pagination: DevicePagination) {
        devices(sortingOrder: $sortingOrder, pagination: $pagination) {
            data {
                id
                name
                user {
                    email
                    admin
                }
                update_progress {
                    last_updated
                    update_status
                }
                firmware_version {
                    id
                    major
                    minor
                    patch
                }
            }
            total
        }
    }
`);

const columns: DataTableColumnDefinition<DeviceData>[] = [
    {
        id: 'update_status',
        render: row => <StatusColumn status={row.update_status} />,
        collapsing: true
    },
    {
        id: 'user_email',
        header: 'User',
        render: row => (
            <>
                {row.user_email}
                &nbsp;
                {row.isAuthorized && <UnauthorizedUserIcon />}
            </>
        )
    },
    {
        id: 'name',
        header: 'Name',
        render: row => row.name
    },
    {
        id: 'version',
        header: 'Firmware',
        render: row => row.version
    },
    {
        id: 'last_updated',
        header: 'Last Updated',
        render: row => {
            if (!row.last_updated) {
                return null;
            }

            const isToday =
                new Date().toUTCString().split('T')[0] ===
                row.last_updated.toUTCString().split('T')[0];
            return isToday ? 'Today' : format(row.last_updated, 'yyyy/MM/dd');
        }
    }
];

function App() {
    const [pagination, setPagination] = useState({
        current: 1,
        size: 10
    });
    const [sort, setSort] = useState<SortObject<DeviceData>>({
        columnId: null,
        direction: 'ascending'
    });
    const [devices, setDevices] = useState<DeviceData[]>([]);

    const { data } = useQuery(GetDevices, {
        variables: {
            sortingOrder: sort.columnId
                ? { [sort.columnId]: sort.direction == 'ascending' ? 'ASC' : 'DESC' }
                : null,
            pagination: {
                limit: pagination.size,
                offset: (pagination.current - 1) * pagination.size
            }
        }
    });

    useEffect(() => {
        if (data) {
            const mappedDevices = data.devices.data.map(device => mapDeviceData(device));
            setDevices(mappedDevices);
        }
    }, [data]);

    return (
        <DataTable
            data={devices}
            sortBy={sort}
            columns={columns}
            onSort={(columnId, direction) => {
                setSort({
                    columnId: columnId,
                    direction: direction
                });
            }}
            header={<Header>Devices to Update</Header>}
            footer={
                <Pagination
                    current={pagination.current}
                    total={data?.devices.total ?? 1}
                    size={pagination.size}
                    sizes={[10, 25, 50]}
                    onPageChange={current => {
                        console.log('onPageChange', current);
                        setPagination(prev => ({
                            ...prev,
                            current: current
                        }));
                    }}
                    onPageSizeChange={size => {
                        setPagination({
                            current: 1,
                            size: size
                        });
                    }}
                />
            }
        />
    );
}

export default App;
