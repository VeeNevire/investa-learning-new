import type { ComponentType } from 'react';

export type AdminPageDefinition = {
    description: string;
    Component: ComponentType;
};

export type AdminPageMap = Record<string, AdminPageDefinition>;
