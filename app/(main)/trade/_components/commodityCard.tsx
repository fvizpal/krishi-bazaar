'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

import React from 'react'

interface CommodityCardProps {
  id: string,
  name: string,
  imageUrl: string,
}


const CommodityCard = ({ id, imageUrl, name, }: CommodityCardProps) => {
  const router = useRouter()
  return (
    <Card onClick={() => router.push(`/trade/${id}`)}
      key={id}
      className='flex'
    >
      <div
        className='w-[80%]'
      >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            Commodity name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div></div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </div>
    </Card>

  )
}

export default CommodityCard