'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { getPaginatedBlogs, getAllCategories, getAllTags } from '@/lib/blog';
import { parsePageFromParams } from '@/lib/pagination';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogPagination from '@/components/blog/BlogPagination';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFilters from '@/components/blog/BlogFilters';

export default function BlogListingContent() {
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  useEffect(() => {
    const page = parsePageFromParams(searchParams);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;

    setCurrentPage(page);
    setSearchQuery(search);
    setSelectedCategory(category);
    setSelectedTag(tag);
  }, [searchParams]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([getAllCategories(), getAllTags()]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    };

    loadFilters();
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPaginatedBlogs(currentPage, selectedCategory, selectedTag, searchQuery);
      setPosts(result.posts);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      setPosts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedTag, searchQuery]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <>
      <section className="tw-border-b tw-border-white/10 tw-py-16 sm:tw-py-24">
        <Container>
          <SectionHeading
            eyebrow="Blog"
            title="Notes from shipping production software."
            description="Practical write-ups on React, Next.js, backends, and the messy parts of getting products in front of real users."
          />
          <div className="tw-mt-10 tw-max-w-xl">
            <BlogSearch onSearch={setSearchQuery} initialValue={searchQuery} placeholder="Search articles…" />
          </div>
          {(categories.length > 0 || tags.length > 0) && (
            <div className="tw-mt-6">
              <BlogFilters
                categories={categories}
                tags={tags}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onCategoryChange={(category) => {
                  setSelectedCategory(category);
                  setSelectedTag(undefined);
                  setCurrentPage(1);
                }}
                onTagChange={(tag) => {
                  setSelectedTag(tag);
                  setSelectedCategory(undefined);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </Container>
      </section>

      <section className="tw-py-16 sm:tw-py-20">
        <Container>
          <BlogGrid posts={posts} loading={loading} />
          {!loading && totalPages > 1 && (
            <BlogPagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" showInfo={false} />
          )}
        </Container>
      </section>
    </>
  );
}
