import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

import FormIndex from './components/Index'

export default function Index({ match: { params }, query = {} }) {
  const onSubmitted = useCallback((sumbitId) => {
    console.log(sumbitId)
  }, [])

  const onReady = useCallback((form) => {
    console.log(form)
  }, [])

  return (
    <FormIndex
      {...query}
      {...params}
      onSubmitted={onSubmitted}
      onReady={onReady}
    />
  )
}

Index.propTypes = {
  match: PropTypes.object.isRequired,
  query: PropTypes.object,
}
