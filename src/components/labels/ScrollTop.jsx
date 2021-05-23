import * as React from 'react';

function ScrollTop(props) {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24" {...props}>
            <g fill="none" fillRule="evenodd">
                <path d="M0 0L24 0 24 24 0 24z" />
                <rect fill="#000" opacity={0.3} x={11} y={10} width={2} height={10} rx={1} />
                <path
                    d="M6.707 12.707a1 1 0 11-1.414-1.414l6-6a1 1 0 011.383-.03l6 5.5a1 1 0 11-1.352 1.474L12.03 7.384l-5.323 5.323z"
                    fill="#000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
}

export default ScrollTop;
