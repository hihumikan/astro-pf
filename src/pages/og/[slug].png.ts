import type { APIContext } from "astro";
import { getCollection, getEntry } from "astro:content";
import { getOgImage } from "../../components/OgImage";

export async function getStaticPaths() {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { slug: post.id },
  }));
}

export async function GET({ params }: APIContext) {
  const post = params.slug ? await getEntry("posts", params.slug) : undefined;
  const body = await getOgImage(post?.data.title ?? "No title");

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
