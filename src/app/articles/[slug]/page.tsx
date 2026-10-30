import React from "react";
import { notFound } from "next/navigation";
import { ARTICLES_DATA } from "@/data/mockData";
import ArticleDetailClient from "@/components/articles/ArticleDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailClient article={article} />;
}

