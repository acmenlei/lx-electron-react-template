import { listener } from "@/utils/events";
import { Link } from "react-router-dom";

type SettingsPageProps = {};

export default function SettingsPage(props: SettingsPageProps) {

  listener('test').then(console.log)

  return (
    <div className=" flex justify-center items-center flex-col h-screen gap-5">
      <p className=" text-center text-4xl">设置页</p>
      <div className="flex gap-5">
        <Link className=" underline hover:opacity-50" to="/">
          首页
        </Link>
        <Link className=" underline hover:opacity-50" to="/posts/lx">
          动态路由
        </Link>
      </div>
    </div>
  );
}
