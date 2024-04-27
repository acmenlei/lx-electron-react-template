import { useParams } from "react-router";
import { Link } from "react-router-dom";

type DetailPageProps = {};

export default function DetailPage(props: DetailPageProps) {
  const params = useParams<{ id: string }>();
  return (
    <div className=" flex justify-center items-center flex-col h-screen gap-5">
      <p className=" text-center text-4xl">动态路由, 参数{params.id}</p>
      <div className="flex gap-5">
        <Link className=" underline hover:opacity-50" to="/settings">
          设置
        </Link>
        <Link className=" underline hover:opacity-50" to="/">
          首页
        </Link>
      </div>
    </div>
  );
}
