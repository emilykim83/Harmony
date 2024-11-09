import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/progress/progressSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditProgress = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: '',

    section: '',

    completed: false,

    completed_at: new Date(),
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { progress } = useAppSelector((state) => state.progress);

  const { progressId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: progressId }));
  }, [progressId]);

  useEffect(() => {
    if (typeof progress === 'object') {
      setInitialValues(progress);
    }
  }, [progress]);

  useEffect(() => {
    if (typeof progress === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = progress[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [progress]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: progressId, data }));
    await router.push('/progress/progress-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit progress')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit progress'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Section' labelFor='section'>
                <Field
                  name='section'
                  id='section'
                  component={SelectField}
                  options={initialValues.section}
                  itemRef={'sections'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Completed' labelFor='completed'>
                <Field
                  name='completed'
                  id='completed'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField label='CompletedAt'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.completed_at
                      ? new Date(
                          dayjs(initialValues.completed_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, completed_at: date })
                  }
                />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/progress/progress-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditProgress.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PROGRESS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditProgress;
