import React from 'react';
import Header from './header';

const Layouts = ({ children }: any) => {
    return (
        <main id="layouts">
            <Header />
            <section className='parent_section'>
                {children}
            </section>
            {/* <footer>
                Footer
            </footer> */}
        </main>
    );
};

export default Layouts;