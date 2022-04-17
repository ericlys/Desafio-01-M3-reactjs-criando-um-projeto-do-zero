import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { useState } from 'react';
import Link from 'next/link';
import Info from '../components/Info';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { formatDate } from '../shared/date';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

function formatResult(result: Post[]): Post[] {
  return result.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [loadingPost, setLoadingPost] = useState(false);

  const handleLoadMorePosts = (): void => {
    setLoadingPost(true);
    fetch(nextPage)
      .then(result => result.json())
      .then(response => {
        setPosts([...posts, ...formatResult(response.results)]);
        setNextPage(response.next_page);
        setLoadingPost(false);
      })
      .catch(err => {
        setLoadingPost(false);
        alert(`Error fetching more posts: ${err.message}`);
      });
  };

  return (
    <>
      <Head>
        <title>spacetraveling | home</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div>
                  <Info
                    icon="calendar"
                    text={formatDate(post.first_publication_date)}
                  />
                  <Info icon="user" text={post.data.author} />
                </div>
              </a>
            </Link>
          ))}
          {nextPage && (
            <button
              disabled={loadingPost}
              type="button"
              onClick={handleLoadMorePosts}
            >
              {loadingPost ? 'Carregando...' : 'Carregar mais posts'}
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    }
  );

  const posts: Post[] = formatResult(postsResponse.results);

  return {
    revalidate: 60 * 60,
    props: {
      postsPagination: {
        results: posts,
        next_page: postsResponse.next_page,
      },
    },
  };
};
