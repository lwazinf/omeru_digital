'use client'

import { useEffect } from "react";
import Store_ from "./components/Store_";
import { getProducts_ } from "./components/utils/utils";
import { useRecoilState } from "recoil";
import { OfferState, UserState, AdminState } from "./components/atoms/atoms";

export default function Home() {
  const [offers_, setOffers_] = useRecoilState(OfferState)
  const [admin_, setAdmin_] = useRecoilState(AdminState);
  const [user_, setUser_] = useRecoilState(UserState);

  const initProducts_ = async () => {
    const data_ = await getProducts_('products')
    setOffers_(data_)
  }

  useEffect(() => {
    initProducts_()
  }, [])

  useEffect(() => {
    if(user_ && user_.uid == 'AyNT6dgwjBfZiD6ZMMzzizopGgH2'){
      setAdmin_(true)
    }else{
      setAdmin_(false)
    }
  }, [user_])
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Store_/>
    </main>
  );
}
