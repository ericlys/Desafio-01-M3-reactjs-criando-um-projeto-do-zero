import { GetStaticPaths, GetStaticProps } from 'next';

import { RichText } from 'prismic-dom';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import Info from '../../components/Info';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../shared/date';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <main className={styles.loading}>
          <p>Carregando...</p>
        </main>
      </>
    );
  }

  const wordsPerMinute = 200;

  const postWords = post.data.content.reduce(
    (acc, c) =>
      acc +
      c.heading.split(' ').length +
      RichText.asText(c.body).split(' ').length,
    0
  );

  const readingTime = Math.ceil(postWords / wordsPerMinute);

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>

      <img className={styles.banner} src={post.data.banner.url} alt="banner" />
      <main className={commonStyles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.infos}>
            <Info
              icon="calendar"
              text={formatDate(post.first_publication_date)}
            />
            <Info icon="user" text={post.data.author} />
            <Info icon="clock" text={`${readingTime} min`} />
          </div>
          {post.data.content.map(content => (
            <div key={content.heading} className={styles.postContent}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
    }
  );

  const paths = posts.results.map(p => ({ params: { slug: p.uid } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      ...response.data,
    },
  };

  return {
    revalidate: 60 * 60,
    props: { post },
  };
};
