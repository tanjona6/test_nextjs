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
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Chargement en cours...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Article non trouvé</p>
      </div>
    );
  }

  return (
    <article className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
      <div className="mb-4">
        <Image
          src={article.image}
          alt={article.title}
          width={600}
          height={400}
          className="rounded-lg shadow-md object-cover"
        />
      </div>
      <p className="text-gray-600 italic mb-4">
        <em>Publié le {new Date(article.createdAt).toLocaleDateString()}</em>
      </p>
      <p className="text-lg text-gray-800">{article.content}</p>
    </article>
  );
}
