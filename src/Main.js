import React from 'react'
import Dropzone from 'react-dropzone'
import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import axios from 'axios'

const SINGED_URL_QUERY = gql`
  query signedUrl($fileName: String! $fileType: String!){
    singedUrlMember (fileName: $fileName, fileType: $fileType) {
      signedUrl
      viewUrl
    }
  }
`

const Main = () => {
  const client = useApolloClient()

  const onDrop = async (files) => {
    const file = files[0]
    console.log(file)

    const { data: { singedUrlMember: { signedUrl, viewUrl } } } = await client.query({
      query: SINGED_URL_QUERY,
      variables: {
        fileName: file.name,
        fileType: file.type
      }
    })

    console.log('signedUrl', signedUrl)
    console.log('viewUrl', viewUrl)

    try {
      const options = {
        headers: {
          'Content-Type': file.type
        }
      }

      const response = await axios.put(signedUrl, file, options)
      console.log(response)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  )
}

export default Main
