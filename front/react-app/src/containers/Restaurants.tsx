import { useEffect, VFC } from "react";
import { fetchRestaurants } from "utils/api";

export const Restaurants: VFC = () => {
  useEffect(() => {
    fetchRestaurants().then((data) => console.log(data));
  }, []);
  return (
    <>
      <div>レストラン一覧</div>
    </>
  );
};
