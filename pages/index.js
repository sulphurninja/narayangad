import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base>
      {/* Banner */}
      <section className="bg-blac banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="">
          {banner.image_enable && (
            <div className=" ">
              <ImageFallback
                className=" object-fill h-full "
                src={banner.image}
                width={2000}
                height={2000}
                priority={true}
                alt="Banner Image"
              />
            </div>
          )}

          <div className=" items-center justify-center ">

            <div className={banner.image_enable ? "mt-12 text-center lg:mt-36 lg:text-center " : "mt-12 text-center lg:mt-0 "}>

              <div className=" text-red-900 text-center">
                <h1 className='text-red-900  font-primary  font-bold'>श्री क्षेत्र संस्थान नारायण गड</h1>

                <div className="flex justify-center mt-6">
                  <img src='/images/location.png' className="h-7" />
                  <h4 className='text-purple-900  font-primary my-auto  font-bold'>
                    जिल्हा – बीड महाराष्ट्र</h4>

                </div>
                <div className=" w-full mt-12 cursor-pointer flex justify-center">
                  <div className="bg-white cursor-pointer px-10 py-4 hover:scale-105  rounded-xl border w-10/12 shadow-lg"> {/**COntent */}
                    <p className="font-secondary text-lg text- text-justify  ">
                      श्री क्षेत्र संस्थान नारायण गड या संस्थानाची स्थापना श्री संत नारायण महाराज यांनी केली. हे तीर्थक्षेत्र बीडच्या वायव्य दिशेस असून ते बीडपासून २१ किलोमीटर अंतरावर आहे. त्याची समुद्रसपाटीपासून उंची अंदाजे ३५०० फुट आहे हे क्षेत्र ज्या डोंगरावर आहे. त्याची दक्षिणोत्तर लांबी सात किलोमीटर असून पूर्वपश्चिम रुंदी तीन किलोमीटर आह. या डोंगराचे विशेष वैशिष्ट्ये असे आहे कि, हा डोंगर कोणत्याही दिशेने पाहिल्यास तो अर्धचंद्राकृती दिसतो...

                    </p>
                    {banner.button.enable && (
                      <Link
                        className="btn btn-primary mt-6"
                        href={banner.button.link}
                        rel={banner.button.rel}
                      >
                        {banner.button.label}
                      </Link>
                    )}
                  </div>
                </div>

              </div>


            </div>

          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-8">
              {/* Featured posts */}
              {featured_posts.enable && (
                <div className="section">
                  {markdownify(featured_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border p-6 dark:border-darkmode-border">
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts[0]} />
                      </div>
                      <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0 md:col-6">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post, i, arr) => (
                            <div
                              className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 &&
                                "border-b border-border dark:border-darkmode-border"
                                }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <ImageFallback
                                  className="mr-3 h-[85px] rounded object-cover"
                                  src={post.frontmatter.image}
                                  alt={post.frontmatter.title}
                                  width={105}
                                  height={85}
                                />
                              )}
                              <div>
                                <h3 className="h5 mb-2">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block hover:text-primary"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                <p className="inline-flex items-center font-bold">
          
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotion */}


              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(recent_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, showPosts).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>
            {/* sidebar */}
            <Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
            />
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
