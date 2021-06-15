import React, { FC } from 'react';
import createStyles from '../styles';

const styles = createStyles({
    box: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        outlineOffset: '0.1rem',
    },
})

type Props = {
    type: 'text' | 'textarea'
    value: string
    onChange: (text: string) => void
    placeholder?: string
}

const TextInput: FC<Props> = ({
    type,
    value,
    onChange,
    placeholder,
}: Props) => {
   
    return (
        <>
            {type === 'textarea' ? (
                <textarea
                    className={styles('box')}
                    onChange={(e) => onChange(e.target.value)}
                    rows={30}
                    placeholder={placeholder}
                >
                    {value}
                </textarea>
            ) : (
                <input
                    type={type}
                    className={styles('box')}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
        </>
    );
}

export default TextInput;