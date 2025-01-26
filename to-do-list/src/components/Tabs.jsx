import React, { useState } from 'react';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
    const content = [
        'Content for Tab 1',
        'Content for Tab 2',
        'Content for Tab 3'
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div>
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={activeTab === index ? 'active' : ''}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="content">
                {content[activeTab]}
            </div>
        </div>
    );
};

export default Tabs;