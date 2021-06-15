import React, { FC } from 'react';
import createStyles from '../styles';

const styles = createStyles({
    button: {
        marginTop: '0.25rem',
        display: 'block',
        padding: '0',
        background: 'darkorange',
        border: 'none',
        borderRadius: '0.5rem',
        outlineOffset: '0.25rem',
        // '&:focus:not(:focus-visible)': {
        //     outline: 'none',
        // }
    },
    inner: {
        display: 'block',
        padding: '0.5rem 1rem',
        background: 'orange',
        borderRadius: '0.5rem',
        transform: 'translateY(-0.2rem);',
        willChange: 'transform',
        transition: 'transform 250ms',

        '&:hover': {
            transform: 'translateY(-0.25rem);',
        },

        '&:active': {
            transform: 'translateY(0);',
            transition: 'transform 37ms',
        },
    },
})

type Props = {
    children: React.ReactNode
    title?: string
    onClick: () => void
    primary?: boolean
}

const Button: FC<Props> = ({
    children,
    title,
    onClick,
    primary = false,
}: Props) => {
   
    return (
        <button
            className={styles('button')}
            onClick={() => onClick()}
            title={title}
        >
            <span className={styles('inner')}>
                {children}
            </span>
        </button>
    );
}

export default Button;