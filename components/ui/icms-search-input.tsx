import { Description, FieldError, Label, SearchField } from "@heroui/react";

export function ICmsSearchInput({
    name,
    className,
    variant,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    fullWidth,
    value,
    placeholder,
    onChange
}: Readonly<{
    name?: string,
    className?: string
    variant?: "primary" | "secondary",
    isDisabled?: boolean,
    isInvalid?: boolean,
    isRequired?: boolean,
    isReadOnly?: boolean,
    fullWidth?:boolean,
    value?: string,
    placeholder?:string
    onChange?: (v: string) => void
}>) {

    return (
        <SearchField
            className={className}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isRequired={isRequired}
            isReadOnly={isReadOnly}
            name={name}
            variant={variant}
            value={value}
            fullWidth={fullWidth}
            onChange={onChange}
        >
            <Label />
            <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder={placeholder} />
                <SearchField.ClearButton />
            </SearchField.Group>
            <Description></Description>
            <FieldError></FieldError>
        </SearchField>
    );
}