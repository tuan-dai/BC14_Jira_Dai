import React from 'react';
import Header from './Header';
import Info from './Info';
import Content from './Content';
import InfoModal from '../InfoModal';
import SearchModal from '../SearchModal';

export default function MainBoard() {
    return (
        <div className="main">
            <Header />
            <Info />
            <Content />
            <InfoModal />
            <SearchModal />
        </div>
    )
}
