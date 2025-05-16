import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { fetchData } from '../utils/fetchData';
import { DateTime, ResultCard } from 'asab_webui_components';
import { LoadingData } from '../components/LoadingData';
import { Link } from 'react-router-dom';

export function UserDetailScreen() {
    const { id } = useParams()
    const { t } = useTranslation();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = `${BASE_URL}/detail/${id}`;

    useEffect(async () => {
        try {
            setLoading(true);
            setError(null);
            const user = await fetchData(API_URL);
            setUser(user);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <LoadingData message={t('DetailScreen|Retrieving user data...')} />
        )
    }

    if (error) {
        return (
            <Container className='h-100'>
                <div>{t('DetailScreen|Error:')} {error}</div>
            </Container>
        )
    }

    return (
        <Container className='h-100'>
            <Link to="/" className='d-flex align-items-center gap-2 mb-2'>
                <i className='bi bi-arrow-left h-5 w-5' />
                <span>{t('DetailScreen|Back to users table')}</span>
            </Link>

            {user.id && (
                <ResultCard body={
                    <article className='d-flex flex-column gap-2 align-items-start'>
                        <p className='d-flex flex-row align-items-baseline gap-2'><i className='bi bi-person h-5 w-5' /> {t('TableScreen|Username')}: {user.username}</p>
                        <p className='d-flex flex-row align-items-baseline gap-2'><i className='bi bi-envelope h-5 w-5' /> {t('TableScreen|Email')}: <span className='fw-bold'>{user.email}</span></p>
                        <p className='d-flex flex-row align-items-baseline gap-2'><i className='bi bi-calendar h-5 w-5' /> {t('TableScreen|Created')}: <DateTime value={user.created} /></p>
                        <p className='d-flex flex-row align-items-baseline gap-2'><i className='bi bi-calendar h-5 w-5' /> {t('TableScreen|Last sign in')}: <DateTime value={user.last_sign_in} /></p>
                        <p className='d-flex flex-row align-items-baseline gap-2'>
                            <i className='bi bi-house h-5 w-5' />
                            {t('TableScreen|Address')}: {user.address}
                        </p>
                    </article>
                } />
            )}
        </Container>
    );
}
