import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { DataTable2, DateTime } from 'asab_webui_components';
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';
import { LoadingData } from '../components/LoadingData';
import { TablePagination } from '../components/TablePagination';

export function TableScreen(props) {
	const { t } = useTranslation();

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const API_URL = `${BASE_URL}/data`;

	useEffect(async () => {
		try {
			setLoading(true);
			setError(null);

			const users = await fetchData(API_URL);
			setUsers(users.data);
			setTotalPages(Math.ceil(users.data.length / 10));
		} catch (err) {
			console.error('Error fetching users:', err);
			setError(err.message || 'Failed to fetch users');
		} finally {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<LoadingData />
		)
	}

	if (error) {
		return (
			<div>{t('DetailScreen|Error:')} {error}</div>
		)
	}

	return (
		<Container className='h-100'>
			{users.length > 0 ? (
				<div>
					<h2 className='mb-4 text-center fw-bold d-flex align-items-center justify-content-center gap-2'>
						<i className='bi bi-table h-5 w-5' /> {t('TableScreen|Total users count')}: {users.length}
					</h2>

					<TablePagination
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={setCurrentPage}
					/>

					<DataTable2
						columns={[
							{
								title: (
									<div className='d-flex align-items-center gap-2'>
										<i className='bi bi-person h-5 w-5' />
										{t('TableScreen|Username')}
									</div>
								),
								render: (user) => <Link to={`/user/${user.row.id}`}><span style={{ cursor: 'pointer' }} data-toggle="tooltip" data-placement="top" title={`User id - ${user.row.id}`}>{user.row.username}</span></Link>,
								filterable: true,
								sortable: true,
							},
							{
								title: (
									<div className='d-flex align-items-center gap-2'>
										<i className='bi bi-envelope h-5 w-5' />
										{t('TableScreen|Email')}
									</div>
								),
								render: (user) => user.row.email,
								filterable: true,
								sortable: true,
							},
							{
								title: (
									<div className='d-flex align-items-center gap-2'>
										<i className='bi bi-calendar h-5 w-5' />
										{t('TableScreen|Created')}
									</div>
								),
								render: (user) => <DateTime value={user.row.created} />,
								filterable: true,
								sortable: true,
							},
							{
								title: (
									<div className='d-flex align-items-center gap-2'>
										<i className='bi bi-calendar h-5 w-5' />
										{t('TableScreen|Last sign in')}
									</div>
								),
								render: (user) => <DateTime value={user.row.last_sign_in} />,
								filterable: true,
								sortable: true,
							},
							{
								title: (
									<div className='d-flex align-items-center gap-2'>
										<i className='bi bi-house h-5 w-5' />
										{t('TableScreen|Address')}
									</div>
								),
								titleTooltip: t('TableScreen|Address'),
								render: (user) => <span>{user.row.address}</span>,
								filterable: true,
								sortable: true,
							}
						]}
						rows={users.slice((currentPage - 1) * 10, currentPage * 10)}
						limit={10}
					/>
				</div>
			) : (
				<h2 className='mb-2 text-center fw-bold'>{t('TableScreen|No users found')}</h2>
			)}

		</Container>
	);
}
