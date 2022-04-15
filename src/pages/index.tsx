import { GetStaticProps } from 'next';
import Head from 'next/head';
import Info from '../components/Info';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | posts</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={styles.posts}>
          <a>
            <strong>titulo teste</strong>
            <p>Subtitulo de teste que vai ser pego do prismic</p>
            <div>
              <Info icon="calendar" text="12/12/2021" />
              <Info icon="user" text="Autor teste" />
            </div>
          </a>
          <a>
            <strong>titulo teste</strong>
            <p>Subtitulo de teste que vai ser pego do prismic</p>
            <div>
              <Info icon="calendar" text="12/12/2021" />
              <Info icon="user" text="Autor teste" />
            </div>
          </a>
          <a>
            <strong>titulo teste</strong>
            <p>Subtitulo de teste que vai ser pego do prismic</p>
            <div>
              <Info icon="calendar" text="12/12/2021" />
              <Info icon="user" text="Autor teste" />
            </div>
          </a>
          <a>
            <strong>titulo teste</strong>
            <p>Subtitulo de teste que vai ser pego do prismic</p>
            <div>
              <Info icon="calendar" text="12/12/2021" />
              <Info icon="user" text="Autor teste" />
            </div>
          </a>

          <button type="button">Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
