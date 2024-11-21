import React, { useState, useRef } from 'react';
import { Popover } from '@precooked/react-popover';
import { IconButton } from '@precooked/react-icon-button';
import { Button } from '@precooked/react-button';


interface ActionConfig {
    name: string; // Nombre de la acción (e.g., 'delete', 'edit', etc.)
    displayName: string; // Nombre visible de la acción
    icon?: string; // Icono de la acción
    props?: Record<string, any>; // Propiedades adicionales para el botón de la acción
}

interface MoreActionsButtonProps {
    buttonStyle?: React.CSSProperties;
    popoverStyle?: React.CSSProperties;
    actions: ActionConfig[];
    onActionClick?: (actionName: string) => void;
}

const MoreActionsButton: React.FC<MoreActionsButtonProps> = ({
    buttonStyle,
    popoverStyle,
    actions,
    onActionClick,
}) => {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const togglePopover = () => setPopoverOpen((prev) => !prev);
    const closePopover = () => setPopoverOpen(false);

    const handleActionClick = (actionName: string) => {
        if (onActionClick) {
            onActionClick(actionName);
        }
        closePopover(); // Cierra el popover al seleccionar una acción
    };

    return (
        <>
            {/* Botón de tres puntos */}
            <IconButton
                ref={buttonRef}
                hasShadow={false}
                type="clear"
                icon="moreVertical"
                onClick={togglePopover}
                style={buttonStyle}
            />

            {/* Popover con las acciones */}
            <Popover
                content={
                    <div style={{ padding: '0px', display: 'flex', flexDirection: 'column' }}>
                        {actions.map((action, index) => (

                            <Button
                                key={action.name}
                                type='clear'
                                title={action.displayName}
                                onClick={() => handleActionClick(action.name)}
                                hasShadow={false}
                                color='text'
                                size={"sm"}
                                borderRadius={0}
                                style={{
                                    marginBottom: 2,
                                    marginTop: 2,
                                    borderBottom: index < actions.length - 1 ? "1px solid #ccc" : "none",
                                    width: '100%',
                                    justifyContent: 'space-around',
                                    ...action.props?.style
                                }}
                                startIcon={action?.icon}
                            />
                        ))}
                    </div>
                }
                anchorRef={buttonRef}
                isOpen={isPopoverOpen}
                onClose={closePopover}
                hasShadow={true}
                containerStyle={{ maxWidth: '300px', ...popoverStyle }}
            />
        </>
    );
};

export default MoreActionsButton;
