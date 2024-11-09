import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/lessons/lessonsSlice';
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

const LessonsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { lessons } = useAppSelector((state) => state.lessons);

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
        <title>{getPageTitle('View lessons')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View lessons')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{lessons?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {lessons.description ? (
              <p dangerouslySetInnerHTML={{ __html: lessons.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>Sections</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons.sections &&
                      Array.isArray(lessons.sections) &&
                      lessons.sections.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/sections/sections-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!lessons?.sections?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Sections Lesson</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons.sections_lesson &&
                      Array.isArray(lessons.sections_lesson) &&
                      lessons.sections_lesson.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/sections/sections-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!lessons?.sections_lesson?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/lessons/lessons-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

LessonsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_LESSONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default LessonsView;
