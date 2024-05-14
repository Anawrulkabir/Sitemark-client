import PropTypes from 'prop-types'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`
)

// const Label = styled('label')`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.65)'
        : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
)

function Tag(props) {
  const { label, onDelete, ...other } = props
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  )
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
)

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
)

export default function Search() {
  //   const [blogs, setBlogs] = useState([])
  //   //   const { title } = blogs

  //   useEffect(() => {
  //     fetch('http://localhost:3000/allBlogs')
  //       .then((res) => res.json())
  //       .then((data) => setBlogs(data))
  //   }, [])

  //   console.log(blogs)
  //   blogs.forEach((item) => {
  //     const name = {
  //       title: item.title,
  //       year: item.viewcount,
  //     }
  //     blogsByTitle.push(name)
  //   })
  //   console.log(blogsByTitle)

  const {
    getRootProps,
    // getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [blogsByTile[1]],
    multiple: true,
    options: blogsByTile,
    getOptionLabel: (option) => option.title,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.value
    console.log(title)
  }

  return (
    <Root>
      <div {...getRootProps()}>
        {/* <Label {...getInputLabelProps()}>Customized hook</Label> */}
        <form onSubmit={handleSubmit}>
          <InputWrapper
            ref={setAnchorEl}
            className={focused ? 'focused' : ''}
            onSubmit={handleSubmit}
          >
            {value.map((option, index) => (
              <StyledTag
                label={option.title}
                {...getTagProps({ index })}
                key={index}
              />
            ))}
            <input {...getInputProps()} name="titleName" type="text" />
          </InputWrapper>
        </form>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })} key={index}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  )
}

const blogsByTile = [
  {
    'title': 'Introduction to Quantum Computing',
    'year': 2500,
  },
  {
    'title': 'Deep Learning Fundamentals',
    'year': 2600,
  },
  {
    'title': 'Artificial Intelligence in Healthcare',
    'year': 2700,
  },
  {
    'title': 'Blockchain Technology Explained',
    'year': 2800,
  },
  {
    'title': 'Smart Contract Development with Solidity',
    'year': 2700,
  },
  {
    'title': 'Introduction to Cybersecurity',
    'year': 2800,
  },
  {
    'title': 'Ethical Hacking Techniques',
    'year': 2900,
  },
  {
    'title': 'Game Development with Unity',
    'year': 3000,
  },
  {
    'title': 'Graphics Programming Techniques',
    'year': 3100,
  },
  {
    'title': 'CI/CD Best Practices',
    'year': 3200,
  },
  {
    'title': 'Microservices Architecture Design',
    'year': 3300,
  },
  {
    'title': 'Cloud Computing Fundamentals',
    'year': 3400,
  },
  {
    'title': 'Web Development with React',
    'year': 3500,
  },
  {
    'title': 'XhitfoQH2L',
  },
  {
    'title': 'Introduction to Quantum Computing',
    'year': 2500,
  },
  {
    'title': 'Deep Learning Fundamentals',
    'year': 2600,
  },
  {
    'title': 'Artificial Intelligence in Healthcare',
    'year': 2700,
  },
  {
    'title': 'Blockchain Technology Explained',
    'year': 2800,
  },
  {
    'title': 'Smart Contract Development with Solidity',
    'year': 2700,
  },
  {
    'title': 'Introduction to Cybersecurity',
    'year': 2800,
  },
  {
    'title': 'Ethical Hacking Techniques',
    'year': 2900,
  },
  {
    'title': 'Game Development with Unity',
    'year': 3000,
  },
  {
    'title': 'Graphics Programming Techniques',
    'year': 3100,
  },
  {
    'title': 'CI/CD Best Practices',
    'year': 3200,
  },
  {
    'title': 'Microservices Architecture Design',
    'year': 3300,
  },
  {
    'title': 'Cloud Computing Fundamentals',
    'year': 3400,
  },
  {
    'title': 'Web Development with React',
    'year': 3500,
  },
  {
    'title': 'XhitfoQH2L',
  },
  {
    'title': 'Introduction to Quantum Computing',
    'year': 2500,
  },
  {
    'title': 'Deep Learning Fundamentals',
    'year': 2600,
  },
  {
    'title': 'Artificial Intelligence in Healthcare',
    'year': 2700,
  },
  {
    'title': 'Blockchain Technology Explained',
    'year': 2800,
  },
  {
    'title': 'Smart Contract Development with Solidity',
    'year': 2700,
  },
  {
    'title': 'Introduction to Cybersecurity',
    'year': 2800,
  },
  {
    'title': 'Ethical Hacking Techniques',
    'year': 2900,
  },
  {
    'title': 'Game Development with Unity',
    'year': 3000,
  },
  {
    'title': 'Graphics Programming Techniques',
    'year': 3100,
  },
  {
    'title': 'CI/CD Best Practices',
    'year': 3200,
  },
  {
    'title': 'Microservices Architecture Design',
    'year': 3300,
  },
  {
    'title': 'Cloud Computing Fundamentals',
    'year': 3400,
  },
  {
    'title': 'Web Development with React',
    'year': 3500,
  },
  {
    'title': 'XhitfoQH2L',
  },
  {
    'title': 'Introduction to Quantum Computing',
    'year': 2500,
  },
  {
    'title': 'Deep Learning Fundamentals',
    'year': 2600,
  },
  {
    'title': 'Artificial Intelligence in Healthcare',
    'year': 2700,
  },
  {
    'title': 'Blockchain Technology Explained',
    'year': 2800,
  },
  {
    'title': 'Smart Contract Development with Solidity',
    'year': 2700,
  },
  {
    'title': 'Introduction to Cybersecurity',
    'year': 2800,
  },
  {
    'title': 'Ethical Hacking Techniques',
    'year': 2900,
  },
  {
    'title': 'Game Development with Unity',
    'year': 3000,
  },
  {
    'title': 'Graphics Programming Techniques',
    'year': 3100,
  },
  {
    'title': 'CI/CD Best Practices',
    'year': 3200,
  },
  {
    'title': 'Microservices Architecture Design',
    'year': 3300,
  },
  {
    'title': 'Cloud Computing Fundamentals',
    'year': 3400,
  },
  {
    'title': 'Web Development with React',
    'year': 3500,
  },
  {
    'title': 'XhitfoQH2L',
  },
]
