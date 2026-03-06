import React from 'react';

const Title = ({children}) => {
    return (
        <div>
            <h2 className='text-2xl font-semibold'>{children}</h2>
        </div>
    );
};

export default Title;