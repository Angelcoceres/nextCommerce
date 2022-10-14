import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import Image from 'next/image'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  // FUSE blockchain details
  const chainId = '0x13881'
  const rpcURL = 'https://matic-mumbai.chainstacklabs.com'
  const networkName = 'Red de testeo de Mumbai'
  const currencyName = 'MATIC'
  const currencySymbol = 'MATIC'
  const explorerURL = 'https://mumbai.polygonscan.com/'

  const addNetwork = async () => {
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
    // refresh
    //window.location.reload();
  }

  function redirect() {
    window.open('https://pay.intuo.com.ar/', '_self')
  }
  const tokenAddress = '0x4e3a4f8121dD9395dC77188174DA3f1D46ed70D4'
  const tokenSymbol = 'USDT'
  const tokenDecimals = 18
  const tokenImage = 'https://assets.codepen.io/4625073/1.jpeg'

  async function addTokenFunction() {
    try {
      const wasAdded = await ethereum.request({
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
        console.log('HelloWorld Coin has not been added')
      }
    } catch (error) {
      console.log(error)
    }
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
        html={product.descriptionHtml || product.description}
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
        <Button
          aria-label="Agregar red de testing"
          type="button"
          className={s.button}
          onClick={() => addNetwork()}
          loading={loading}
          disabled={variant?.availableForSale === false}
        >
          {variant?.availableForSale === false
            ? 'No disponible'
            : 'Red de Testeo'}
        </Button>
        <Button
          aria-label="Agregar Token a Metamask"
          type="button"
          className={s.button}
          onClick={() => addTokenFunction()}
          loading={loading}
          disabled={variant?.availableForSale === false}
        >
          {variant?.availableForSale === false
            ? 'No disponible'
            : 'Agregar Token'}
        </Button>
      </div>
      <div className="mt-6">
        <Collapse title="Descripcion Corta">{product.description}</Collapse>
        <Collapse title="Detalles">{product.specification}</Collapse>
      </div>
      <div>
        <Collapse title="QR de Pago">
          <Image src={'/metamask-qr.jpeg'} width={300} height={300} />
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
