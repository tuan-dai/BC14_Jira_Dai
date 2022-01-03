import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb flex gap-2" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>

                    <li className="breadcrumb-item">CyberLearn</li>

                    <li className="breadcrumb-item active" aria-current="page">
                        Cyber Board
                    </li>
                </ol>
            </nav>
            <h3 className="font-medium text-3xl mb-3">Cyber Board</h3>
        </div>

    )
}
