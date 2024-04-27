import { Link } from "react-router-dom";
import viteLogo from "@/assets/logo-vite.svg";

type HomePageProps = {};

export default function HomePage(props: HomePageProps) {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-5 px-2">
      <img src={viteLogo} alt="" />
      <p className=" text-center text-4xl">首页</p>
      <div className="flex gap-5">
        <Link className="underline hover:opacity-50" to="/settings">
          设置
        </Link>
        <Link className="underline hover:opacity-50" to="/posts/lx">
          动态路由
        </Link>
      </div>
    </div>
  );
}
