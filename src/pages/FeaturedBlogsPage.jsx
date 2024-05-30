import { DataGrid } from '@mui/x-data-grid'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData, useParams } from 'react-router-dom'

// const id = useParams()
const columns = [
  { field: 'id', headerName: 'Serial', width: 70 },
  {
    field: 'title',
    headerName: 'Blog Title',
    width: 200,
    type: 'link',
    renderCell: (params) => (
      <Link to={`/all-blogs/${params.row._id}`}>{params.value}</Link>
    ),
  },
  { field: 'writer', headerName: 'Writer', width: 100 },
  {
    field: 'profile',
    headerName: 'Pofile',
    type: 'number',
    width: 90,
  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'number',
    width: 90,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.title || ''} ${row.writer || ''}`,
  // },
]

const rows = [
  {
    id: 1,
    writer: 'Snow',
    title: 'Jon',
    profile: 35,
    category: 'Data Science',
  },
  {
    id: 2,
    writer: 'Lannister',
    title: 'Cersei',
    profile: 42,
    category: 'Data Science',
  },
  {
    id: 3,
    writer: 'Lannister',
    title: 'Jaime',
    profile: 45,
    category: 'Data Science',
  },
  {
    id: 4,
    writer: 'Stark',
    title: 'Arya',
    profile: 16,
    category: 'Data Science',
  },
  {
    id: 5,
    writer: 'Targaryen',
    title: 'Daenerys',
    profile: null,
    category: 'Data Science',
  },
  {
    id: 6,
    writer: 'Melisandre',
    title: null,
    profile: 150,
    category: 'Data Science',
  },
  {
    id: 7,
    writer: 'Clifford',
    title: 'Ferrara',
    profile: 44,
    category: 'Data Science',
  },
  {
    id: 8,
    writer: 'Frances',
    title: 'Rossini',
    profile: 36,
    category: 'Data Science',
  },
  {
    id: 9,
    writer: 'Roxie',
    title: 'Harvey',
    profile: 65,
    category: 'Data Science',
  },
]

export default function FeaturedBlogsPage() {
  const allblogs = useLoaderData()
  console.log(allblogs)

  const { category, title, additional_info, detailed_description } = allblogs

  const newRows = []
  let counter = 0
  allblogs.forEach((blog, index) => {
    const row = {
      id: index + 1,
      writer: blog.additional_info?.author,
      title: blog.title,
      profile: 76,
      category: blog.category,
      _id: blog._id,
    }
    counter++
    if (counter >= 11) {
      return
    } else {
      newRows.push(row)
    }
  })

  return (
    <>
      <Helmet>
        <title>Sitemark | Featured Blogs</title>
      </Helmet>
      <div className="mx-5 lg:mx-20 border mt-24 lg:mt-32">
        <div className="w-full">
          <DataGrid
            rows={newRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  )
}
