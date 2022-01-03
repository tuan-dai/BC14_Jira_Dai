import React from 'react'

export default function SearchModal() {
    return (
        <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModal" aria-hidden="true">
            <div className="modal-dialog modal-search">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="border-b-2 w-full border-blue-600 flex">
                            <span className='w-1/12 ml-3 text-lg'><i className="fa fa-search" /></span>
                            <input className="w-11/12 focus: outline-none border-none" />
                        </div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className='font-medium'>RECENT ISSUES</p>
                        <div className='flex gap-4 pl-3 mb-2 items-center hover:bg-gray-200 rounded-sm'>
                            <span className="text-xl">
                                <i className="fa fa-bookmark" />
                            </span>
                            <div>
                                <p>cyberlearn</p>
                                <p className='text-sm'>CYB-516516</p>
                            </div>
                        </div>

                        <div className='flex gap-4 pl-3 mb-2 items-center hover:bg-gray-200 rounded-sm'>
                            <span className="text-xl">
                                <i className="fa fa-check-square"></i>
                            </span>
                            <div>
                                <p>Jirabug</p>
                                <p className='text-sm'>BUG-238066</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
