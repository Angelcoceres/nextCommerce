import { OperationContext } from '@vercel/commerce/api/operations'
import { Category } from '@vercel/commerce/types/site'
import { LocalConfig } from '../index'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({}: OperationContext<any>) {
  function getSiteInfo({
    query,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    return Promise.resolve({
      categories: [
        {
          id: 'nuevos-ingresos',
          name: 'Nuevos Ingresos',
          slug: 'nuevos-ingresos',
          path: '/nuevos-ingresos',
        },
        {
          id: 'destacado',
          name: 'Destacado',
          slug: 'destacado',
          path: '/destacado',
        },
      ],
      brands: [],
    })
  }

  return getSiteInfo
}
