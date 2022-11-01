import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { Component, FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import Image from 'next/image'

declare var window: any

interface ProductSidebarProps {
  product: Product
  className?: string
}

export async function addTokenFunction() {
  const tokenAddress = '0x4e3a4f8121dD9395dC77188174DA3f1D46ed70D4'
  const tokenSymbol = 'USDT'
  const tokenDecimals = 18
  const tokenImage = 'https://assets.codepen.io/4625073/1.jpeg'
  try {
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    })

    if (wasAdded) {
      console.log('Thanks for your interest!')
    } else {
      console.log('Coin has not been added')
    }
  } catch (error) {
    console.log(error)
  }
}

export const addNetwork = async () => {
  const chainId = '0x13881'
  const rpcURL = 'https://matic-mumbai.chainstacklabs.com'
  const networkName = 'Red de testeo de Mumbai'
  const currencyName = 'MATIC'
  const currencySymbol = 'MATIC'
  const explorerURL = 'https://mumbai.polygonscan.com/'
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: chainId,
        chainName: networkName,
        rpcUrls: [rpcURL],
        blockExplorerUrls: [explorerURL],
        nativeCurrency: {
          name: currencyName,
          symbol: currencySymbol, // 2-6 caracteres
          decimals: 18,
        },
      },
    ],
  })
}

export const ProductSidebar: FC<ProductSidebarProps> = ({
  product,
  className,
}) => {
  let mobile = false
  //if (window.screen.width < 800) mobile = true
  //else mobile = false

  function redirect() {
    const id = product.id
    if (screen.width < 800)
      window.open(
        'https://metamask.app.link/send/pay-0x4e3a4f8121dD9395dC77188174DA3f1D46ed70D4/transfer?address=0x4a218f824d2Cc4414702FC5420391B2356b51D5b&uint256=3.2e19',
        '_self'
      )
    else window.open(`https://pay.intuo.com.ar/${id}`, '_self')
  }

  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml}
      />
      <div>
        {true && (
          <Button
            aria-label="Comprar"
            type="button"
            className={s.button}
            onClick={() => redirect()}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false ? 'No disponible' : 'Comprar'}
          </Button>
        )}
      </div>
      <div className="mt-6">
        <Collapse title="Especificaciones">{product.specification}</Collapse>
        <Collapse title="Descripcion corta">{product.description}</Collapse>
      </div>
    </div>
  )
}
