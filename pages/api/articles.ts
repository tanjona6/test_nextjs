import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany();
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des articles.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
