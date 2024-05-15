import { Button, Tooltip } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Search from '../components/CustomSearch/Search'
import { AuthContext } from '../provider/AuthProvider'

const apiErrorPosts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]
const topics = [
  'All Category',
  'Web Development',
  'Mobile App Development',
  'Machine Learning',
  'Data Science',
  'Artificial Intelligence',
  'Blockchain',
  'Cybersecurity',
  'Game Development',
  'DevOps',
  'Cloud Computing',
]

export default function AllBlogs() {
  const [blogs, setBlogs] = useState(useLoaderData())
  const [isFilled, setIsFilled] = useState(false)
  const [filledPosts, setFilledPosts] = useState([])
  const { user } = useContext(AuthContext)
  const [wishListBlogs, setWishListBlogs] = useState([])
  // const [filteredArr, setFilteredArr] = useState([])
  // const filteredArr = []

  // const { _id, title, additional_info, category, description } = blogs

  const handleSort = (e) => {
    e.preventDefault()
    const category = e.target.value
    console.log(category)

    if (category === 'All Category') {
      const url = `${import.meta.env.VITE_CONNECTION_STRING}/allBlogs`
      axios.get(url).then((res) => setBlogs(res.data))
    } else {
      const url = `${
        import.meta.env.VITE_CONNECTION_STRING
      }/allBlogs?category=${category}`
      axios.get(url).then((res) => setBlogs(res.data))
    }

    // fetch(url)
    //   .then((res) => console.log(res))
    //   .then((data) => setBlogs(data))
  }
  const handleSortByTitle = (e) => {
    e.preventDefault()
    const title = e.target.titleSearch.value

    if (title === '') {
      const url = `${import.meta.env.VITE_CONNECTION_STRING}/allBlogs`
      axios.get(url).then((res) => setBlogs(res.data))
    } else {
      const url = `${
        import.meta.env.VITE_CONNECTION_STRING
      }/allBlogs?title=${title}`
      axios.get(url).then((res) => setBlogs(res.data))
    }

    // fetch(url)
    //   .then((res) => console.log(res))
    //   .then((data) => setBlogs(data))
  }

  // const toggleFill = () => {
  //   setIsFilled(!isFilled)
  //   console.log('btn clicked')
  // }
  // console.log(isFilled)

  const toggleFill = (postId) => {
    // Use functional form of setState to ensure correct state updates
    setFilledPosts((prevFilledPosts) => {
      // Check if postId is already in the filled posts array
      if (prevFilledPosts.includes(postId)) {
        // If it is, remove it
        return prevFilledPosts.filter((id) => id !== postId)
      } else {
        // If it's not, add it
        return [...prevFilledPosts, postId]
      }
    })
  }

  const getMatchedBlogs = (blogs, wishListBlogs) => {
    const matchedBlogIds = wishListBlogs.map((item) => item.blogId)
    const matchedBlogs = blogs.filter((blog) =>
      matchedBlogIds.includes(blog._id)
    )
    return matchedBlogs
  }

  const [matchedBlogs, setMatchedBlogs] = useState([])

  // Fetch matched blogs on component mount
  useEffect(() => {
    const matched = getMatchedBlogs(blogs, wishListBlogs)
    setMatchedBlogs(matched)
  }, [blogs, wishListBlogs])

  const handleAddToWishLIst = (_id) => {
    console.log('cart id clicked', _id)

    const wishItem = {
      email: user?.email,
      blogId: _id,
      published_date: new Date(),
    }

    axios
      .post(`${import.meta.env.VITE_CONNECTION_STRING}/addToWishList`, wishItem)
      .then.catch((error) => console.log(error.message))
  }
  useEffect(() => {
    axios(`${import.meta.env.VITE_CONNECTION_STRING}/wishListBlogs`).then(
      (res) => {
        setWishListBlogs(res.data)
        console.log(res.data)
      }
    )
  }, [])

  console.log(matchedBlogs)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Our Blogs
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-6   mt-4 w-full lg:mx-auto  border-b  shadow-md sm:mb-4">
          <div className=" flex  flex-col">
            <p className="text-xs text-zinc-500">Search by category</p>
            <div className=" w-full">
              <select
                onChange={handleSort}
                id="country"
                name="category"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 lg:py-1.5 py-2  pl-2 pr-24  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* {blogs.map((topic) => (
                <option key={topic._id}>{topic}</option>
              ))} */}
                {topics.map((topic, index) => (
                  <option key={index}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
          <div className=" p-3 ">
            <p className="text-xs text-zinc-500">
              Search by title (Not Working)
            </p>
            <Search />
          </div>
          <div className=" p-3">
            <p className="text-xs text-zinc-500">Search by title</p>
            <form action="" onSubmit={handleSortByTitle} className="flex gap-3">
              <input
                type="search"
                name="titleSearch"
                placeholder="Data Science"
                className="border  rounded-md border-gray-300 pl-2 pr-12"
              />

              <Button
                type="submit"
                value={'Search'}
                className="border"
                variant="contained"
                size="small"
              >
                Search
              </Button>
            </form>
          </div>
        </div>

        <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
          {blogs.map((post) => (
            <article
              key={post?._id}
              className="flex max-w-xl flex-col items-start justify-between shadow-sm rounded-md px-4 py-4  pb-5  hover:scale-[99%] hover:transition-transform duration-1000"
            >
              <img
                alt=""
                src="https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                // src={post.image}
                className="rounded-md mb-3"
              />
              <div className="flex items-center gap-x-4 text-xs">
                <time
                  dateTime={post?.additional_info?.published_date}
                  className="text-gray-500"
                >
                  {post?.additional_info?.published_date}
                </time>
                <a
                  //   href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post?.category}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post?.href}>
                    <span className="absolute inset-0" />
                    {post?.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post?.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4  w-full">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a>
                      <span className="absolute inset-0" />
                      {post?.additional_info?.author}
                    </a>
                  </p>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
                <div className="flex-1  rounded-full">
                  <div className="flex flex-row-reverse items-center justify-start pr-3  text-right gap-0">
                    <Link to={`/all-blogs/${post._id}`}>
                      <Button className="" size="small">
                        Details
                      </Button>
                    </Link>

                    <Tooltip title="Add to Wishlist">
                      <Button
                        // onClick={toggleFill}
                        onClick={() => {
                          toggleFill(post._id)
                          handleAddToWishLIst(post._id)
                        }}
                        className="cursor-pointer border"
                        size="small"
                        variant="text"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          // fill="none"
                          // fill={isFilled ? 'red' : 'none'}
                          fill={filledPosts.includes(post._id) ? 'red' : 'none'}
                          stroke={
                            !filledPosts.includes(post._id)
                              ? 'currentColor'
                              : ''
                          }
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          // stroke={!isFilled ? 'currentColor' : ''}
                          // stroke="currentColor"
                          // className="w-5 h-5 active:fill-red-600"
                          className={`w-5 h-5 cursor-pointer ${
                            isFilled ? 'fill-red-600' : ''
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
