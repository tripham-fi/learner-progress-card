import { useEffect, useState } from "react";
import type { Learner } from "../constants/types";
import CardItem from "../components/CardItem";
import { getLearners } from "../api/learner";

export default function CardList() {
  const [data, setData] = useState<Learner[]>([]);
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getLearners();
        setData(data.data);
      } catch (e) {
        console.log(e);
      }
    }

    loadData();
  }, []);
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length > 0 &&
        data.map((learner) => (
          <CardItem learner={learner} key={learner.name} />
        ))}
    </div>
  );
}
