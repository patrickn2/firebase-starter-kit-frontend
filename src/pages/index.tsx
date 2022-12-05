import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import MainPage from '../page_templates/main/main';

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();
  return {
    props: { data },
  };
};

const IndexPage = (props) => {
  const Page = dynamic(() => import('../page_templates/main/homepage/index'), {
    loading: () => <AppLoader />,
  });

  return (
    <MainPage>
      <Page {...props} />
    </MainPage>
  );
};

export default IndexPage;
