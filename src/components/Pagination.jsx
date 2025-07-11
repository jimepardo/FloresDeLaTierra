import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {totalPages > 1 && (
                <nav aria-label="Paginación de productos" className="mt-4" style={{ background: 'transparent' }}>
                    <ul className="pagination justify-content-center">

                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Anterior">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>

                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Siguiente">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default Pagination;