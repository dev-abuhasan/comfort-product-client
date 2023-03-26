import type { AppProps } from 'next/app';
import '@/services/scss/global.scss';
import dynamic from 'next/dynamic';
import Loading from '@/components/ui-kits/loading-notify/loading';
import { ToastNotify } from '@/components/ui-kits/loading-notify/toast-notify';

const MainLayout = dynamic(() => import('@/components/layouts/layouts'), {
  loading: () => <Loading />,
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      <ToastNotify />
    </>
  )
}
