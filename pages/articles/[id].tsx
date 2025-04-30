import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Article } from '../../types/article';
import articlesData from '../../data/articles.json';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articlesData.map((article) => ({
    params: { id: article.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ article: Article | null }> = async (context) => {
  const { id } = context.params!;
  const article = articlesData.find((a) => a.id === id) || null;

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
    revalidate: 10,
  };
};

export default function ArticlePage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <Image src={article.image} alt={article.title} width={600} height={400} />
      <p><em>Publié le {new Date(article.createdAt).toLocaleDateString()}</em></p>
      <p>{article.content}</p>
    </article>
  );
}
