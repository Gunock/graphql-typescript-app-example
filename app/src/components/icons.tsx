import { Icon, Loader, Popup } from 'semantic-ui-react';

export function UnauthorizedUserIcon() {
    const icon = <Icon name="warning sign" color="yellow" />;
    return <Popup content="Not Authorized" trigger={icon} />;
}

export function UpToDateIcon() {
    const icon = <Icon name="checkmark" color="green" />;
    return <Popup content="Up to Date" trigger={icon} />;
}

export function UpdateInProgressIcon() {
    const icon = <Loader active inline size="tiny" />;
    return <Popup content="Update In Progress" trigger={icon} />;
}
