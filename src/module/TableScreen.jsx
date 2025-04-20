import React from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export function TableScreen(props) {
	const { t } = useTranslation();

	return (
		<Container className='h-100'>
			{t('Training|Hello, there is nothing here yet!')}
		</Container>
	);
}
