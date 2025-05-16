import React from 'react'
import { useTranslation } from 'react-i18next';

export function TablePagination({
    currentPage,
    totalPages,
    setCurrentPage,
}) {
    const { t } = useTranslation(); 

    return (
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <span>{t('TableScreen|Page')} {currentPage} {t('TableScreen|of')} {totalPages}</span>
            <div className='btn-group'>
                <button
                    className='btn btn-outline-secondary'
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className='bi bi-chevron-left'></i>
                </button>
                <button
                    className='btn btn-outline-secondary'
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <i className='bi bi-chevron-right'></i>
                </button>
            </div>
        </div>
    )
}
