import { ComponentType } from "react";

export interface TabItem {
    id: string;
    label: string;
    component: ComponentType;
}
