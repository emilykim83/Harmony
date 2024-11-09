import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/sections/sectionsSlice';
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

const SectionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.sections);

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
        <title>{getPageTitle('View sections')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View sections')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{sections?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Lesson</p>

            <p>{sections?.lesson?.title ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Progress Section</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Completed</th>

                      <th>CompletedAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.progress_section &&
                      Array.isArray(sections.progress_section) &&
                      sections.progress_section.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/progress/progress-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='completed'>
                            {dataFormatter.booleanFormatter(item.completed)}
                          </td>

                          <td data-label='completed_at'>
                            {dataFormatter.dateTimeFormatter(item.completed_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!sections?.progress_section?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/sections/sections-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

SectionsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SECTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default SectionsView;
