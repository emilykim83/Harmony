import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/progress/progressSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const ProgressView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { progress } = useAppSelector((state) => state.progress);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View progress')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View progress')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{progress?.user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Section</p>

            <p>{progress?.section?.name ?? 'No data'}</p>
          </div>

          <FormField label='Completed'>
            <SwitchField
              field={{ name: 'completed', value: progress?.completed }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <FormField label='CompletedAt'>
            {progress.completed_at ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  progress.completed_at
                    ? new Date(
                        dayjs(progress.completed_at).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No CompletedAt</p>
            )}
          </FormField>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/progress/progress-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProgressView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PROGRESS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ProgressView;
