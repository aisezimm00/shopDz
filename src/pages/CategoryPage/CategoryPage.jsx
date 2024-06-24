import React from 'react'
import CategoryComponent from '../../components/CategoryComponent/CategoryComponent'
import { useParams } from 'react-router-dom'

export default function CategoryPage() {
  const params = useParams()
  return (
    <div className='container'>
      <CategoryComponent category={params.category} limit={false}/>
    </div>
  )
}
