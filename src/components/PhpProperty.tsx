import React, { FC } from 'react';
import TextInput from '../patterns/TextInput';

type Props = {
    name: string
    type: string
    onChange: (type: string) => void
}

const PhpProperty: FC<Props> = ({
    name,
    type,
    onChange,
}: Props) => {
 
    return (
        <label>
            <pre>{name}</pre>
            Type:
            <TextInput
                type="text"
                value={type}
                onChange={onChange}
            />
        </label>
    );
}

export default PhpProperty;