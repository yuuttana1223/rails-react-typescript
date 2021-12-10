import { VFC } from "react";
import { useParams } from "react-router-dom";

export const Foods: VFC = () => {
  const { restaurantId } = useParams();
  console.log(restaurantId);

  return (
    <>
      <div>フード一覧</div>
    </>
  );
};
