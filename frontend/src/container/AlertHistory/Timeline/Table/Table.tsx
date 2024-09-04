import './Table.styles.scss';

import { Table } from 'antd';
import {
	useGetAlertRuleDetailsTimelineTable,
	useTimelineTable,
} from 'pages/AlertDetails/hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { timelineTableColumns } from './useTimelineTable';

function TimelineTable(): JSX.Element {
	const {
		isLoading,
		isRefetching,
		isError,
		data,
		isValidRuleId,
		ruleId,
	} = useGetAlertRuleDetailsTimelineTable();

	const { timelineData, totalItems } = useMemo(() => {
		const response = data?.payload?.data;
		return {
			timelineData: response?.items,
			totalItems: response?.total,
		};
	}, [data?.payload?.data]);

	const { paginationConfig, onChangeHandler } = useTimelineTable({
		totalItems: totalItems ?? 0,
	});

	const { t } = useTranslation('common');

	if (isError || !isValidRuleId || !ruleId) {
		return <div>{t('something_went_wrong')}</div>;
	}

	return (
		<div className="timeline-table">
			<Table
				rowKey={(row): string => `${row.fingerprint}-${row.value}-${row.unixMilli}`}
				columns={timelineTableColumns()}
				dataSource={timelineData}
				pagination={paginationConfig}
				size="middle"
				onChange={onChangeHandler}
				loading={isLoading || isRefetching}
			/>
		</div>
	);
}

export default TimelineTable;
