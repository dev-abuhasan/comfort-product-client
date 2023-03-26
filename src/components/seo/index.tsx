import Head from "next/head";
import { useRouter } from "next/router";
import { metadata } from "./meta-data";

export const Seo = ({ title, description }: any) => {
    const router = useRouter();
    return (
        <Head>
            <title>{`${title ? title : ""} ${metadata.title}`}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={`${description ? description : ""} ${metadata.description}`} />
            <meta property="og:url" content={`${metadata.siteUrl}${router.asPath}`} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={metadata.title} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={`${metadata.siteUrl}${metadata.socialBanner}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={metadata.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${metadata.siteUrl}${metadata.socialBanner}`} />
        </Head>
    );
};

export default Seo;