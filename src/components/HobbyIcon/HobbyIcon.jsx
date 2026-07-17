import React from 'react';

const iconPaths = {
    coin: <><circle cx="12" cy="12" r="9" /><path d="M8 8h8M8 16h8M9 8v8M12 8v8M15 8v8" /></>,
    stamp: <><path d="M7 3h10v3a2 2 0 0 0 2 2v8a2 2 0 0 0-2 2v3H7v-3a2 2 0 0 0-2-2V8a2 2 0 0 0 2-2V3Z" /><path d="m8.5 10 3.5 2.5 3.5-2.5M8.5 10v5h7v-5" /></>,
    reading: <><path d="M3.5 5.5A8.5 8.5 0 0 1 12 7v12a8.5 8.5 0 0 0-8.5-1.5v-12Z" /><path d="M20.5 5.5A8.5 8.5 0 0 0 12 7v12a8.5 8.5 0 0 1 8.5-1.5v-12Z" /></>,
    gardening: <><path d="M12 21v-9" /><path d="M12 13C7.5 13 5 10.5 5 6c4.5 0 7 2.5 7 7Z" /><path d="M12 16c0-4.5 2.5-7 7-7 0 4.5-2.5 7-7 7Z" /><path d="M8 21h8" /></>,
    travel: <path d="m3 11 8.5 1.5L18 5l2 1-4 8 4 3-1 1-5-1.5-3 4-1.5-.5 1-4.5L4 13l-1-2Z" />,
};

const HobbyIcon = ({ type }) => (
    <svg
        className="hobby-icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {iconPaths[type]}
    </svg>
);

export default HobbyIcon;
