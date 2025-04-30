import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '../types/article';
import articlesData from '../data/articles.json';

export const getStaticProps: GetStaticProps<{ articles: Article[] }> = async () => {
  return {
    props: {
      articles: articlesData,
    },
    revalidate: 10,
  };
};

export default function Home({ articles }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
  <main className="p-6 max-w-4xl mx-auto">
  <h1 className="text-3xl font-bold mb-8 text-center">Liste des articles</h1>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {articles.map((article) => (
      <div key={article.id} className="border p-4 rounded shadow hover:shadow-lg transition">
        <Link href={`/articles/${article.id}`}>
          <h2 className="text-xl text-blue-600 hover:underline">{article.title}</h2>
        </Link>
        <Image
          src={article.image}
          alt={article.title}
          width={150}
          height={100}
          className="my-2 w-auto max-w-full object-cover rounded"
        />
        <p className="text-gray-700">{article.description}</p>
      </div>
    ))}
  </div>
</main>

  

  );
}
