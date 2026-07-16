import { Header, Key, Label, ListBox, Select, Separator } from "@heroui/react";
import { Fragment, JSX, useCallback } from "react";
export type SelectCallbackOpts = {
    defaultChildren: React.ReactNode,
    isPlaceholder: boolean,
    state: any
}
export type SelectDataItem = {
    id: string,
    name: string,
    icon?: string | JSX.Element,
    [key: string]: any
}
export type SelectGroupDataItem = {
    id: string,
    name: string,
    groups: Array<SelectDataItem>
}
export function ICmsSelect({
    name,
    isRequired,
    data,
    isGroup,
    label,
    defaultValue,
    value,
    ariaLabel='select project',
    className,
    variant,
    placeholder,
    onChange,
    onSelect,
    onRenderItem
}: Readonly<{
    name?: string,
    isRequired?: boolean,
    data: Array<SelectDataItem | SelectGroupDataItem>,
    isGroup?: boolean,
    label?: React.ReactNode,
    defaultValue?: Key,
    value?:Key,
    ariaLabel?:string,
    className?:string,
    placeholder?:string,
    variant?: "secondary" | "primary"
    onChange?: ((value: Key | null) => void),
    onSelect?: (params: SelectCallbackOpts) => React.ReactNode,
    onRenderItem?: (item: SelectDataItem) => React.ReactNode,
}>) {

    const render = useCallback((item: SelectDataItem | SelectGroupDataItem, index: number) => {
        if (isGroup) {
            const rec = item as SelectGroupDataItem;
            const elements = <ListBox.Section key={rec.id}>
                <Header>{rec.name}</Header>
                {
                    rec.groups.map(menu =>
                        <ListBox.Item key={menu.id} id={menu.id} textValue={menu.name}>
                            {onRenderItem ? onRenderItem(menu) : <>
                                {menu.name}
                                <ListBox.ItemIndicator />
                            </>}
                        </ListBox.Item>
                    )
                }
            </ListBox.Section>
            if (index > 0) {
                return <Fragment key={`group-${item.id}`}>
                    <Separator />
                    {elements}
                </Fragment>
            }
            return elements
        }
        const menu = item as SelectDataItem;
        return <ListBox.Item key={menu.id} id={menu.id} textValue={menu.name}>
            {onRenderItem ? onRenderItem(menu) : <>
                {menu.name}
                <ListBox.ItemIndicator />
            </>}
        </ListBox.Item>
    }, [isGroup])

    return (
        <Select aria-label={ariaLabel} className={className} variant={variant} isRequired={isRequired} name={name} defaultValue={defaultValue} value={value} placeholder={placeholder}  onChange={onChange}>
            <Label>{label}</Label>
            <Select.Trigger>
                <Select.Value>
                    {
                        onSelect ? ({ defaultChildren, isPlaceholder, state }) => onSelect({ defaultChildren, isPlaceholder, state }) : null
                    }
                </Select.Value>
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="rounded-lg">
                <ListBox>
                    {data.map((item, index) => render(item, index))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}