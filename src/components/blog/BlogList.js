import HorizontalCard from "./HorizontalCard"


import SmallSetPagination from "components/pagination/SmallSetPagination"

function BlogList({posts, get_blog_list_page, count}) {
  return (
    <div className="overflow-hidden px-8">
    <ul role="list" className="">
      {posts&&posts.map((post,index) => (
        <HorizontalCard data={post} key={index}/>
      ))}
    </ul>
<SmallSetPagination list_page={get_blog_list_page} list={posts} count={count&&count} />
  </div>
  )
}

export default BlogList