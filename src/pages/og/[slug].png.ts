import type { APIContext } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import { getOgImage } from "../../components/OgImage";

export async function getStaticPaths() {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

export async function get({ params }: APIContext) {
  const post = await getEntryBySlug("posts", params.slug);
  const body = await getOgImage(post?.data.title ?? "No title");

  return { body, encoding: "binary" };
}
