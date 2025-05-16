import React from 'react';
import { Spinner } from "asab_webui_components";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";

export function LoadingData({ message = 'Retrieving data...' }) {
    const { t } = useTranslation();

    return (
        <Container className='h-100'>
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                <Spinner />
                <h3 className='text-center mt-2'>{t(message)}</h3>
            </div>
        </Container>
    )
}   