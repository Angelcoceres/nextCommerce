import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function MetamaskInfo({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className={'justify-center items-center flex'}>
        <p className={'font-semibold text-xl'}>
          Descargar la aplicación oficial
        </p>
      </div>
      <br />
      <div className={'px-48'}>
        <p>
          Como consejo,{' '}
          <strong>
            siempre ve al portal oficial de la aplicación para obtener el enlace
            original de la App
          </strong>
          , esto para evitar descargar aplicaciones fraudulentas.
        </p>
        <p>
          Al empezar, MetaMask te mostrará 3 opciones: importar una wallet desde
          una semilla, escanear el código QR de una semilla y crear una nueva
          wallet (<em>Crear billetera</em>). Debes seleccionar la opción{' '}
          <em>Crear billetera</em>.
        </p>
        <p>
          Por medidas de seguridad, al momento de crear la wallet y generar la
          semilla de recuperación, MetaMask bloquea las capturas de pantalla.
          Fuente: MetaMask.
        </p>
        <br />
        <p>Los pasos que siguen para crear una billetera son:</p>
        <br />
        <ul>
          <li>
            <strong>Crea tu contraseña</strong>: <br />
            Deberás asignar una contraseña para proteger la aplicación en el
            dispositivo donde estás creando la wallet. Esta clave no se ve
            ligada en lo absoluto con tu semilla de recuperación. Puedes también
            utilizar el sistema de verificación biométrica de tu teléfono.
          </li>
          <br />
          <li>
            <Image
              src={'/metamask/crear-contraseña.png'}
              height={500}
              width={900}
            ></Image>
          </li>
          <br />
          <li>
            <strong>Asegura tu wallet</strong>: <br />
            Paso esencial para proteger tus fondos. Deberás copiar en un lugar
            seguro tu semilla de recuperación conformada por 12 palabras. Lo mas
            recomendable es copiarlas en una hoja de papel, evitando respaldos
            en medios digitales.
          </li>
          <br />
          <li>
            <Image
              src={'/metamask/asegurar-billetera.png'}
              height={500}
              width={900}
            ></Image>
          </li>
          <br />
          <li>
            <strong>Confirma la frase de recuperación</strong>: <br />
            En el siguiente paso tendrás que confirmar la contraseña previamente
            creada y aparecerán las 12 palabras claves asociadas a la billetera,
            estas 12 palabras debes guardarla en uno o más lugares seguros, esto
            lo recomienda metamask en el paso anterior.
          </li>
          <br />
          <li>
            <Image
              src={'/metamask/palabra-clave.png'}
              height={500}
              width={900}
            ></Image>
          </li>
          <br />
          <li>
            <strong>
              <em>
                Una vez copiadas las palabras Metamask te pedirá que las ordenes
                para asegurar que están bien copiadas, luego de esto si están
                bien ordenadas te permitirá avanzar.{' '}
              </em>
            </strong>
          </li>
          <br />
          <li>
            <Image
              src={'/metamask/ordenar-palabras.png'}
              height={500}
              width={900}
            ></Image>
          </li>
          <br />
          <li>
            Una vez ordenadas las palabras ya tendrás acceso a tu billetera
            desde tu móvil para comenzar a utilizarla.
          </li>
          <br />
          <li>
            <Image
              src={'/metamask/todo-listo.png'}
              height={500}
              width={400}
            ></Image>
          </li>
          <br />
        </ul>
        <p>
          En la ultima imagen, en la esquina superior derecha, veras un logo de
          codigo QR que deberas utilizar para abrir la app del store en tu
          dispositivo.
        </p>
      </div>
    </>
  )
}

MetamaskInfo.Layout = Layout
