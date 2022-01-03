import React from 'react'

export default function Info() {
    return (
        <div className="info flex items-center">
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group flex items-center">
                <div className="avatar">
                    <img src="/img/download (1).jfif" alt="1" />
                </div>
                <div className="avatar">
                    <img src="/img/download (2).jfif" alt="2" />
                </div>
                <div className="avatar">
                    <img src="/img/download (3).jfif" alt="3" />
                </div>
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>

    )
}
