import { ReactNode } from 'react';

import { Table } from 'semantic-ui-react';

interface DataWithId {
    id: number;
}

export interface DataTableColumnDefinition<T extends DataWithId> {
    id: keyof T;
    header?: string;
    collapsing?: boolean;
    render: (row: T) => ReactNode;
}

export type SortDirection = 'ascending' | 'descending';

export interface SortObject<T extends DataWithId> {
    columnId: keyof T | null | undefined;
    direction: SortDirection;
}

interface DataTableProps<T extends DataWithId> {
    header?: string | ReactNode;
    footer?: string | ReactNode;
    columns: DataTableColumnDefinition<T>[];
    data: T[];
    sortBy: SortObject<T>;
    onSort: (columnId: keyof T, direction: SortDirection) => void;
}

export function DataTable<T extends DataWithId>(props: DataTableProps<T>) {
    function onTableHeaderCellClick(column: DataTableColumnDefinition<T>) {
        let direction: SortDirection = 'ascending';
        if (props.sortBy.columnId === column.id && props.sortBy.direction === 'ascending') {
            direction = 'descending';
        }

        props.onSort(column.id, direction);
    }

    return (
        <Table sortable celled className=".datatable">
            <Table.Header>
                {!!props.header && (
                    <Table.Row>
                        <Table.HeaderCell colSpan={props.columns.length}>
                            {props.header}
                        </Table.HeaderCell>
                    </Table.Row>
                )}
                <Table.Row>
                    {props.columns.map(column => (
                        <Table.HeaderCell
                            key={column.id.toString()}
                            sorted={
                                column.id == props.sortBy.columnId
                                    ? props.sortBy.direction
                                    : undefined
                            }
                            onClick={() => onTableHeaderCellClick(column)}
                            collapsing={column.collapsing}
                        >
                            {column.header}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.data.map(item => (
                    <Table.Row key={item.id}>
                        {props.columns.map(column => (
                            <Table.Cell key={column.id.toString()} collapsing={column.collapsing}>
                                {column.render(item)}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                {!!props.footer && (
                    <Table.Row>
                        <Table.HeaderCell colSpan={props.columns.length}>
                            {props.footer}
                        </Table.HeaderCell>
                    </Table.Row>
                )}
            </Table.Footer>
        </Table>
    );
}
