import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import Info from '../../components/Info';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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

export default function Post(): JSX.Element {
  return (
    <>
      <img
        className={styles.banner}
        src="https://picsum.photos/1920/1080"
        alt="grayscale"
      />
      <main className={commonStyles.container}>
        <article className={styles.post}>
          <h1>My title</h1>
          <div className={styles.infos}>
            <Info icon="calendar" text="16 Abr 2022" />
            <Info icon="user" text="Ericlys Teste" />
            <Info icon="clock" text="4 min" />
          </div>
          <div className={styles.postContent}>
            <h2>contentTitle1</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est a
              blanditiis corporis molestias omnis modi, quis laboriosam pariatur
              quod voluptatum possimus nobis reprehenderit molestiae tempore
              sapiente. Similique minus deleniti temporibus.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              unde temporibus, in asperiores voluptatem veritatis suscipit
              inventore nesciunt tenetur? Non expedita perferendis inventore
              vitae accusantium facilis fugit corporis omnis placeat!
            </p>
            <h2>contentTitle2</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est a
              blanditiis corporis molestias omnis modi, quis laboriosam pariatur
              quod voluptatum possimus nobis reprehenderit molestiae tempore
              sapiente. Similique minus deleniti temporibus.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              unde temporibus, in asperiores voluptatem veritatis suscipit
              inventore nesciunt tenetur? Non expedita perferendis inventore
              vitae accusantium facilis fugit corporis omnis placeat!
            </p>
            <h2>contentTitle3</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est a
              blanditiis corporis molestias omnis modi, quis laboriosam pariatur
              quod voluptatum possimus nobis reprehenderit molestiae tempore
              sapiente. Similique minus deleniti temporibus.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              unde temporibus, in asperiores voluptatem veritatis suscipit
              inventore nesciunt tenetur? Non expedita perferendis inventore
              vitae accusantium facilis fugit corporis omnis placeat!
            </p>
          </div>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
