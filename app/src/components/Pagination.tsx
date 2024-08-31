import { Icon, Menu } from 'semantic-ui-react';

interface PaginationProps {
    current: number;
    total: number;
    size: number;
    sizes: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export function Pagination(props: PaginationProps) {
    return (
        <>
            <Menu floated="right" pagination>
                <Menu.Item
                    as="a"
                    icon
                    disabled={props.current === 1}
                    onClick={() => props.onPageChange(1)}
                >
                    <Icon name="angle double left" />
                </Menu.Item>
                <Menu.Item
                    as="a"
                    icon
                    disabled={props.current === 1}
                    onClick={() => props.onPageChange(props.current - 1)}
                >
                    <Icon name="angle left" />
                </Menu.Item>
                <Menu.Item active>
                    Page {props.current} of {props.total}
                </Menu.Item>
                <Menu.Item
                    as="a"
                    icon
                    disabled={props.current === props.total}
                    onClick={() => props.onPageChange(props.current + 1)}
                >
                    <Icon name="angle right" />
                </Menu.Item>
                <Menu.Item
                    as="a"
                    icon
                    disabled={props.current === props.total}
                    onClick={() => props.onPageChange(props.total)}
                >
                    <Icon name="angle double right" />
                </Menu.Item>
            </Menu>
            <Menu floated="right" pagination>
                <Menu.Item active>Items per page</Menu.Item>
                {props.sizes.map(size => (
                    <Menu.Item
                        key={size}
                        onClick={() => {
                            props.onPageSizeChange(size);
                            props.onPageChange(1);
                        }}
                        header={size === props.size}
                        name={`${size}`}
                    />
                ))}
            </Menu>
        </>
    );
}
