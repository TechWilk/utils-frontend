import React, { FC } from 'react';
import createStyles from '../styles';

const styles = createStyles({
    header: {
        width: '100%',
        backgroundColor: '#eee'
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
})

type Props = {
    children: React.ReactNode
    title: string
    strapline?: React.ReactNode
}

const Page: FC<Props> = ({
    children,
    title,
    strapline,
}: Props) => {
   
    return (
        <>
            <header className={styles('header')}>
                <div className={styles('content', 'row')}>
                    <div>utils.sh</div>
                    <div>A bunch of stuff that may, or may not, be useful to developers</div>
                </div>
            </header>
            <main>
                <div className={styles('content')}>
                    <h1>{title}</h1>
                    {strapline && (
                        <p>{strapline}</p>
                    )}
                    {children}
                </div>
            </main>
            <footer>
                <div className={styles('content')}>
                    A <a href="https://wilk.tech">wilk.tech</a> site
                </div>
            </footer>
        </>
    );
}

export default Page;