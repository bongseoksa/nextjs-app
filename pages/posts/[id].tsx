import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '@/lib/posts';
import homeStyles from '@/styles/Post.module.css';

const Post = ({
  postData,
}: {
  postData: { title: string; date: string; contentHtml: string };
}) => {
  console.log('postData', postData);
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
};

export default Post;

/** 접근 가능한 [id]를 정의
 * fallback:true 옵션 설정시 404 forbidden 페이지로 리다이렉트
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // [{params: {id: 'pre-rendering'}, {id: 'ssg-ssr} }]
  return {
    paths,
    fallback: false,
  };
};

/** 컴포넌트 내 props 정보 가져오기 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
